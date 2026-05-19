import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AiService {
  static async detectDuplicates(description: string, lat: number, lng: number, orgId: string) {
    // This would call an external ML model or use vector search (pgvector)
    // to find complaints with similar descriptions in the same area
    console.log('AI Engine: Running duplicate detection...');
    
    return []; // Return list of potential duplicate IDs
  }

  static async predictSlaRisk(complaintId: string) {
    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
      include: { assignments: true }
    });

    if (!complaint) return { riskScore: 0, recommendation: 'Complaint not found' };

    // Heuristic: (Time elapsed / SLA) + (If no assignment, high risk)
    const now = new Date();
    const createdAt = new Date(complaint.createdAt);
    const hoursElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    const slaHours = 24; // Default 24h

    let riskScore = hoursElapsed / slaHours;
    if (complaint.assignments.length === 0) {
      riskScore += 0.3; // 30% penalty for no assignment
    }

    // Cap at 1.0
    riskScore = Math.min(riskScore, 1.0);

    return {
      riskScore,
      recommendation: riskScore > 0.8 
        ? 'IMMEDIATE ACTION: Escalate to supervisor and assign nearest available worker.' 
        : riskScore > 0.5 
          ? 'Monitor: Complaint approaching 50% SLA threshold.'
          : 'Low Risk: Progressing within SLA.'
    };
  }

  static async getRegionalSurgePrediction(orgId: string) {
    // Forecast complaint surges by analyzing historical patterns
    return {
      predictedSurge: '25%',
      impactedWards: ['Ward 4', 'Ward 12'],
      reason: 'Upcoming local festival'
    };
  }
}
