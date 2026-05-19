import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class EdgeVisionService {
  /**
   * Syncs real-time waste identification audits from edge devices (mobile/IoT).
   */
  static async syncEdgeAudit(vehicleId: string, data: { lat: number; lng: number; wasteType: string; confidence: number }) {
    try {
      return await prisma.edgeAudit.create({
        data: {
          vehicleId,
          lat: data.lat,
          lng: data.lng,
          wasteType: data.wasteType,
          confidence: data.confidence,
          weightEstimate: 0.5 // Mocked weight
        }
      });
    } catch (error) {
      logger.error('Edge Sync Error:', error);
    }
  }

  /**
   * Processes IoT Smart Bin fill-level pings.
   */
  static async processSmartBinPing(binCode: string, fillLevel: number) {
    try {
      const bin = await prisma.smartBin.update({
        where: { code: binCode },
        data: {
          fillLevel,
          lastPingAt: new Date()
        }
      });

      // Trigger alerts if bin is nearly full
      if (fillLevel > 90) {
        logger.warn(`Smart Bin ${binCode} is 90%+ full. Routing nearest collection vehicle.`);
      }

      return bin;
    } catch (error) {
      logger.error('Smart Bin Error:', error);
    }
  }
}
