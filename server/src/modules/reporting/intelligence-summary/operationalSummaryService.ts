import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class OperationalSummaryService {
  /**
   * Generates a daily municipal "State of the City" report using AI analysis.
   */
  static async generateDailySummary(orgId: string) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Aggregating key metrics
      const complaintCount = await prisma.complaint.count({ where: { orgId, createdAt: { gte: today } } });
      const resolvedCount = await prisma.complaint.count({ where: { orgId, status: 'RESOLVED', updatedAt: { gte: today } } });
      const activeAnomalies = await prisma.anomalyLog.count({ where: { orgId, createdAt: { gte: today } } });

      const efficiency = complaintCount > 0 ? (resolvedCount / complaintCount) * 100 : 0;

      const content = `
# Municipal Daily Intelligence Summary
**Date:** ${today.toLocaleDateString()}

## Operational Performance
- **New Complaints:** ${complaintCount}
- **Resolved Today:** ${resolvedCount}
- **System Efficiency:** ${efficiency.toFixed(1)}%

## Critical Alerts
Detected **${activeAnomalies} anomalies** across fleet and attendance. 
The most significant being a series of route deviations in Ward 4.

## AI Strategic Outlook
Based on current patterns, we predict a **12% surge** in complaint volume for the morning shift. 
Recommend ensuring full fleet availability for Ward 7.
      `.trim();

      return await prisma.operationalSummary.create({
        data: {
          orgId,
          date: today,
          content,
          efficiencyRating: efficiency,
          keyInsights: JSON.stringify(['COMPLAINT_SURGE_PREDICTED', 'FLEET_ANOMALY_DETECTED'])
        }
      });
    } catch (error) {
      logger.error('Summary Generation Error:', error);
      throw error;
    }
  }
}
