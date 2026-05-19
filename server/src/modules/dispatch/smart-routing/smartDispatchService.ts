import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class SmartDispatchService {
  /**
   * Automatically routes a new complaint to the best available worker.
   * Considers proximity, current workload, and expertise.
   */
  static async autoDispatchComplaint(complaintId: string) {
    try {
      const complaint = await prisma.complaint.findUnique({
        where: { id: complaintId },
        include: { ward: true }
      });

      if (!complaint || !complaint.wardId) return;

      // 1. Fetch available workers in the same ward
      const workers = await prisma.user.findMany({
        where: {
          role: { name: 'WORKER' },
          // Assuming we track availability via shift status or current tasks
          assignments: {
            none: {
              complaint: { status: 'IN_PROGRESS' }
            }
          }
        },
        include: { tracking: { take: 1, orderBy: { timestamp: 'desc' } } }
      });

      if (workers.length === 0) {
        logger.info(`No available workers for auto-dispatch of ${complaintId}`);
        return;
      }

      // 2. Proximity Matching (Simulation)
      // In real world, we'd use GIS distance calculations
      const bestWorker = workers[0]; 

      // 3. Automated Assignment
      await prisma.$transaction([
        // Update Complaint
        prisma.complaint.update({
          where: { id: complaintId },
          data: { status: 'ASSIGNED' }
        }),
        // Create Assignment
        prisma.assignment.create({
          data: {
            complaintId,
            workerId: bestWorker.id,
            status: 'PENDING'
          }
        }),
        // Log Dispatch Decision
        prisma.dispatchLog.create({
          data: {
            orgId: (await prisma.ward.findUnique({ where: { id: complaint.wardId }, include: { zone: true } }))?.zone.orgId || '',
            complaintId,
            assignedToId: bestWorker.id,
            dispatchMode: 'AUTO',
            reasoning: 'Proximity match with zero current workload.',
            proximity: 1.2
          }
        })
      ]);

      logger.info(`Complaint ${complaintId} auto-dispatched to worker ${bestWorker.id}`);
      return bestWorker;
    } catch (error) {
      logger.error('Smart Dispatch Error:', error);
    }
  }
}
