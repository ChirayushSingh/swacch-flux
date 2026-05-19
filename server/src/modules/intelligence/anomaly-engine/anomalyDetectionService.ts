import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class AnomalyDetectionService {
  /**
   * Scans operational streams to detect suspicious patterns.
   */
  static async scanForAnomalies(orgId: string) {
    try {
      const anomalies = [];

      // 1. Detect Ghost Attendance (Stationary workers during shift)
      const ghostAttendance = await this.detectGhostAttendance(orgId);
      anomalies.push(...ghostAttendance);

      // 2. Detect Route Deviations
      const routeDeviations = await this.detectRouteDeviations(orgId);
      anomalies.push(...routeDeviations);

      // Persist to database
      for (const anomaly of anomalies) {
        await prisma.anomalyLog.create({
          data: {
            orgId,
            type: anomaly.type,
            severity: anomaly.severity,
            details: anomaly.details,
            targetId: anomaly.targetId
          }
        });
      }

      return anomalies;
    } catch (error) {
      logger.error('Anomaly Detection Error:', error);
      throw error;
    }
  }

  private static async detectGhostAttendance(orgId: string) {
    // Logic: Find workers who checked in but haven't sent a GPS ping in > 2 hours
    // OR all pings are within 10 meters (stationary).
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    
    // Mocking the detection logic
    return [
      {
        type: 'GHOST_ATTENDANCE',
        severity: 'CRITICAL',
        targetId: 'worker-id-123',
        details: 'User checked in at 06:00 but no movement detected for 3 hours.'
      }
    ];
  }

  private static async detectRouteDeviations(orgId: string) {
    // Logic: Compare VehiclePing coordinates against the planned Route geometry.
    // If distance > 500m for multiple consecutive pings, flag it.
    return [
      {
        type: 'ROUTE_DEVIATION',
        severity: 'WARNING',
        targetId: 'vehicle-mh-01-24',
        details: 'Vehicle deviated 1.2km from Route 45B for 20 minutes.'
      }
    ];
  }
}
