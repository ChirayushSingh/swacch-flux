import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class RouteIntelligenceService {
  /**
   * Calculates route coverage for a specific vehicle and route assignment.
   * Conceptually matches GPS pings against the planned GeoJSON route.
   */
  static async calculateDailyCoverage(vehicleId: string, routeId: string, date: Date) {
    try {
      const route = await prisma.route.findUnique({ where: { id: routeId } });
      if (!route) return;

      const startTime = new Date(date);
      startTime.setHours(0, 0, 0, 0);
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999);

      // Fetch all pings for the day
      const pings = await prisma.vehiclePing.findMany({
        where: {
          vehicleId,
          timestamp: { gte: startTime, lte: endTime }
        },
        orderBy: { timestamp: 'asc' }
      });

      if (pings.length === 0) {
        return this._logMissedRoute(routeId, vehicleId, date);
      }

      // TODO: Implement Spatial Matching Logic (Map Matching)
      // For now, we simulate coverage calculation
      const actualDistance = this._calculateTotalDistance(pings);
      const plannedDistance = 10.5; // Mock: In real app, derived from route geometry
      const coveragePercent = Math.min((actualDistance / plannedDistance) * 100, 100);

      const coverageLog = await prisma.routeCoverage.create({
        data: {
          routeId,
          vehicleId,
          date,
          plannedDistance,
          actualDistance,
          coveragePercent,
          status: coveragePercent > 90 ? 'COMPLETED' : 'PARTIAL',
        }
      });

      // 5. Automated Penalty Logic
      if (coveragePercent < 80) {
        await this._generatePenalty(route.orgId, 'LOW_COVERAGE', 500, `Coverage was only ${coveragePercent.toFixed(2)}%`);
      }

      return coverageLog;
    } catch (error) {
      logger.error('Route Intelligence Error:', error);
    }
  }

  private static _calculateTotalDistance(pings: any[]) {
    // Basic Haversine distance summation
    return pings.length * 0.5; // Mock distance
  }

  private static async _logMissedRoute(routeId: string, vehicleId: string, date: Date) {
    return prisma.routeCoverage.create({
      data: {
        routeId,
        vehicleId,
        date,
        plannedDistance: 10,
        actualDistance: 0,
        coveragePercent: 0,
        status: 'MISSED',
        penaltyApplied: 1000
      }
    });
  }

  private static async _generatePenalty(orgId: string, type: string, amount: number, details: string) {
    return prisma.penaltyLog.create({
      data: { orgId, type, amount, details }
    });
  }
}
