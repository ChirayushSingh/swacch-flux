import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class EsgReportingService {
  /**
   * Generates a comprehensive ESG report for a municipality.
   * Aggregates data from Carbon logs, Reward transactions, and Service reliability.
   */
  static async generateEsgReport(orgId: string, period: { start: Date; end: Date }) {
    try {
      // 1. Environmental Data (Carbon Saved + Waste Diversion)
      const carbonLogs = await prisma.carbonLog.findMany({
        where: { orgId, date: { gte: period.start, lte: period.end } }
      });
      const wasteImpacts = await prisma.wasteImpact.findMany({
        where: { orgId, date: { gte: period.start, lte: period.end } }
      });

      // 2. Social Data (Citizen Rewards + Participation)
      const rewards = await prisma.rewardTransaction.findMany({
        where: { user: { organization: { id: orgId } }, createdAt: { gte: period.start, lte: period.end } }
      });

      // 3. Governance Data (SLA Compliance + Audit Verification)
      const complaints = await prisma.complaint.findMany({
        where: { orgId, createdAt: { gte: period.start, lte: period.end } }
      });

      // Aggregations
      const carbonSaved = carbonLogs.reduce((acc, curr) => acc + curr.co2Emitted, 0) / 1000; // Tons
      const socialScore = Math.min((rewards.length / 100) * 80, 100);
      const slaCompliant = complaints.filter(c => c.status === 'RESOLVED').length / (complaints.length || 1);

      return await prisma.eSGReport.create({
        data: {
          orgId,
          reportTitle: `Annual ESG Statement ${period.start.getFullYear()}`,
          periodStart: period.start,
          periodEnd: period.end,
          carbonSaved,
          socialScore,
          governanceCompliance: slaCompliant,
          isPublic: true
        }
      });
    } catch (error) {
      logger.error('ESG Reporting Error:', error);
    }
  }
}
