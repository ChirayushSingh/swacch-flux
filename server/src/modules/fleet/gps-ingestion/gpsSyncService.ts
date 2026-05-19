import { PrismaClient } from '@prisma/client';
import { GpsIngestionService } from './gpsIngestionService';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();
let syncInterval: NodeJS.Timeout | null = null;

export class GpsSyncService {
  /**
   * Starts the automatic background synchronization of live GPS device telemetry.
   */
  static startSync() {
    if (syncInterval) return;

    logger.info('Starting Live GPS Telemetry Sync Service...');

    // Run synchronization immediately, then every 10 seconds
    this.syncLiveGpsData();
    syncInterval = setInterval(() => {
      this.syncLiveGpsData();
    }, 10000);
  }

  /**
   * Stops the background synchronization.
   */
  static stopSync() {
    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
      logger.info('Stopped Live GPS Telemetry Sync Service.');
    }
  }

  /**
   * Fetches real-time GPS positions from the navilap endpoint and updates local SQLite models.
   */
  private static async syncLiveGpsData() {
    try {
      // 1. Fetch live GPS locations from public API
      const response = await fetch('https://navilap.com/gps/public/api/v1/vehicles/location/data', {
        headers: {
          'username': 'perfectservices@321'
        }
      });

      if (!response.ok) {
        logger.error(`Live GPS Fetch failed with status: ${response.status}`);
        return;
      }

      const rawData = await response.json();
      if (!Array.isArray(rawData)) {
        logger.warn('Live GPS Fetch returned non-array payload');
        return;
      }

      // 2. Locate or provision a default organization to associate paired vehicles
      let defaultOrg = await prisma.organization.findFirst();
      if (!defaultOrg) {
        defaultOrg = await prisma.organization.create({
          data: {
            name: 'BMC Mumbai',
            code: 'BMC',
            type: 'MUNICIPAL_CORP'
          }
        });
      }

      const orgId = defaultOrg.id;

      // 3. Process every vehicle telemetry packet
      for (const item of rawData) {
        const { imei, vehicleNo, latitude, longitude, speed, direction, timestamp } = item;

        if (!imei || !vehicleNo) continue;

        // Find or create paired GpsDevice
        let device = await prisma.gpsDevice.findUnique({
          where: { imei },
          include: { vehicle: true }
        });

        if (!device) {
          // Find or create paired Vehicle
          let vehicle = await prisma.vehicle.findUnique({
            where: { registrationNo: vehicleNo }
          });

          if (!vehicle) {
            vehicle = await prisma.vehicle.create({
              data: {
                registrationNo: vehicleNo,
                type: 'COMPACTOR',
                orgId,
                status: speed && speed > 0 ? 'ACTIVE' : 'IDLE'
              }
            });
          }

          device = await prisma.gpsDevice.create({
            data: {
              imei,
              protocol: 'TELTONIKA',
              isActive: true,
              vehicle: {
                connect: { id: vehicle.id }
              }
            },
            include: { vehicle: true }
          });

          // Associate vehicle back to device
          await prisma.vehicle.update({
            where: { id: vehicle.id },
            data: { deviceId: device.id }
          });
        }

        // 4. Ingest telemetry ping via Ingestion Service
        await GpsIngestionService.processPing(imei, {
          lat: latitude,
          lng: longitude,
          speed: speed || 0,
          heading: direction || 0,
          timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()
        });
      }

      logger.info(`Live GPS Telemetry Sync complete. Processed ${rawData.length} real vehicles.`);

    } catch (error) {
      logger.error('Error during Live GPS Telemetry Sync execution:', error);
    }
  }
}
