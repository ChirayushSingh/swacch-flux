import { PrismaClient } from '@prisma/client';
import { io } from '../../../index';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class GpsIngestionService {
  /**
   * Processes incoming GPS pings from hardware or mobile apps.
   * Broadly handles validation, persistence, and real-time broadcasting.
   */
  static async processPing(imei: string, data: { lat: number; lng: number; speed?: number; heading?: number; timestamp?: string }) {
    try {
      // 1. Find device and linked vehicle
      const device = await prisma.gpsDevice.findUnique({
        where: { imei },
        include: { vehicle: true }
      });

      if (!device || !device.vehicle) {
        logger.warn(`Received ping for unregistered device: ${imei}`);
        return;
      }

      const vehicleId = device.vehicle.id;
      const orgId = device.vehicle.orgId;

      // 2. Persist high-frequency ping
      await prisma.vehiclePing.create({
        data: {
          vehicleId,
          lat: data.lat,
          lng: data.lng,
          speed: data.speed || 0,
          heading: data.heading || 0,
          timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        }
      });

      // 3. Update vehicle's last known position (for dashboard performance)
      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: {
          lastLat: data.lat,
          lastLng: data.lng,
          lastPingAt: new Date(),
          status: data.speed && data.speed > 0 ? 'ACTIVE' : 'IDLE'
        }
      });

      // 4. Real-time broadcast to organization command center
      io.to(orgId).emit('vehicle_movement', {
        vehicleId,
        registrationNo: device.vehicle.registrationNo,
        lat: data.lat,
        lng: data.lng,
        speed: data.speed,
        heading: data.heading,
        status: data.speed && data.speed > 0 ? 'ACTIVE' : 'IDLE'
      });

    } catch (error) {
      logger.error('GPS Ingestion Error:', error);
    }
  }
}
