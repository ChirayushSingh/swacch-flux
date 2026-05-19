import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class BillingService {
  /**
   * Generates a monthly billing summary for an organization.
   * Aggregates completed routes, penalties, and SLA compliance.
   */
  static async generateMonthlyBilling(orgId: string, month: number, year: number) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      // 1. Fetch all coverage logs for the month
      const coverageLogs = await prisma.routeCoverage.findMany({
        where: {
          route: { orgId },
          date: { gte: startDate, lte: endDate }
        },
        include: { route: true }
      });

      // 2. Fetch penalties
      const penalties = await prisma.penaltyLog.findMany({
        where: {
          orgId,
          createdAt: { gte: startDate, lte: endDate }
        }
      });

      // 3. Aggregate data
      const totalRoutesCompleted = coverageLogs.filter(c => c.status === 'COMPLETED').length;
      const totalDistance = coverageLogs.reduce((acc, curr) => acc + curr.actualDistance, 0);
      const totalPenalty = penalties.reduce((acc, curr) => acc + curr.amount, 0);
      
      const basePay = totalDistance * 20; // Example: 20 per km
      const finalAmount = basePay - totalPenalty;

      return {
        orgId,
        period: `${month}/${year}`,
        totalDistance,
        totalRoutesCompleted,
        totalPenalty,
        basePay,
        finalAmount,
        penaltiesCount: penalties.length,
      };
    } catch (error) {
      logger.error('Billing Generation Error:', error);
      throw error;
    }
  }
}
