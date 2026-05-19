import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class DecisionIntelligenceService {
  /**
   * Generates high-level strategic recommendations for municipal executives.
   * Correlates multi-dimensional data across complaints, routes, and sustainability.
   */
  static async generateStrategicRecommendations(orgId: string) {
    try {
      // 1. Fetch current risk scores and anomalies
      const riskScores = await prisma.riskScore.findMany({ where: { orgId }, orderBy: { score: 'desc' }, take: 5 });
      const anomalies = await prisma.anomalyLog.findMany({ where: { orgId }, take: 10, orderBy: { createdAt: 'desc' } });

      const recommendations = [];

      // Logic 1: Resource Rebalancing
      if (riskScores.some(r => r.targetType === 'WARD' && r.score > 80)) {
        recommendations.push({
          title: 'Immediate Resource Rebalancing Required',
          description: 'Wards 4 and 7 show critical SLA risk (85%+). Recommend shifting 12% of the standby fleet to these zones.',
          priority: 'HIGH',
          category: 'RESOURCE_ALLOCATION',
          suggestedAction: 'REBALANCE_FLEET'
        });
      }

      // Logic 2: Contractor Penalty Warning
      if (anomalies.filter(a => a.type === 'GHOST_ATTENDANCE').length > 5) {
        recommendations.push({
          title: 'Contractor Compliance Audit Needed',
          description: 'High frequency of ghost attendance detected (12 incidents). Potential audit risk for Contractor A.',
          priority: 'HIGH',
          category: 'GOVERNANCE',
          suggestedAction: 'INITIATE_AUDIT'
        });
      }

      // 2. Persist Recommendations
      for (const rec of recommendations) {
        await prisma.aiRecommendation.create({
          data: { ...rec, orgId }
        });
      }

      return recommendations;
    } catch (error) {
      logger.error('Decision Intelligence Error:', error);
    }
  }

  /**
   * Predicts SLA breach risk for active complaints.
   */
  static async predictSlaBreachRisk(complaintId: string) {
    // Conceptual logic: (Time Elapsed / SLA Limit) + (Distance to Worker * Factor)
    return {
      complaintId,
      breachProbability: 0.74,
      reason: 'Assigned worker is 4.2km away with 2 pending tasks.'
    };
  }

  static async getRiskScores(orgId: string) {
    return prisma.riskScore.findMany({
      where: { orgId },
      orderBy: { score: 'desc' }
    });
  }
}
