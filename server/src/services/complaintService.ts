import { PrismaClient } from '@prisma/client';
import { ApiError } from '../core/utils/ApiError';
import { io } from '../index';

const prisma = new PrismaClient();

export class ComplaintService {
  static async createComplaint(data: any, tenantId: string) {
    const ticketId = `SF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const complaint = await prisma.complaint.create({
      data: {
        ...data,
        ticketId,
        orgId: tenantId,
      },
      include: { citizen: true, ward: true }
    });

    // Notify organization room via Socket.IO
    io.to(tenantId).emit('new_complaint', complaint);

    return complaint;
  }

  static async getComplaints(filter: any, options: any, tenantId: string) {
    const { status, priority, wardId } = filter;
    const { limit = 10, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    const complaints = await prisma.complaint.findMany({
      where: {
        orgId: tenantId,
        isDeleted: false,
        ...(status && { status }),
        ...(priority && { priority }),
        ...(wardId && { wardId }),
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      orderBy: { [sortBy]: sortOrder },
      include: { citizen: true, ward: true, assignments: { include: { worker: true } } }
    });

    const total = await prisma.complaint.count({
      where: { orgId: tenantId, isDeleted: false, ...(status && { status }) }
    });

    return { complaints, total, page, limit };
  }

  static async assignComplaint(complaintId: string, workerId: string, tenantId: string) {
    const complaint = await prisma.complaint.findFirst({
      where: { id: complaintId, orgId: tenantId }
    });

    if (!complaint) {
      throw new ApiError(404, 'Complaint not found');
    }

    const assignment = await prisma.assignment.create({
      data: {
        complaintId,
        workerId,
      }
    });

    await prisma.complaint.update({
      where: { id: complaintId },
      data: { status: 'ASSIGNED' }
    });

    // Log Activity
    await prisma.activityLog.create({
      data: {
        complaintId,
        userId: assignment.workerId,
        action: 'ASSIGNED_TO_WORKER',
        details: JSON.stringify({ workerId })
      }
    });

    // Notify via Socket
    io.to(tenantId).emit('complaint_assigned', { complaintId, workerId });

    return assignment;
  }
}
