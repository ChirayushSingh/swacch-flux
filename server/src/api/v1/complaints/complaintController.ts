import { Request, Response, NextFunction } from 'express';
import { ComplaintService } from '../../../services/complaintService';
import httpStatus from 'http-status';

export class ComplaintController {
  static create = async (req: any, res: Response, next: NextFunction) => {
    try {
      const complaint = await ComplaintService.createComplaint(req.body, req.tenantId);
      res.status(httpStatus.CREATED).send(complaint);
    } catch (error) {
      next(error);
    }
  };

  static list = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { status, priority, wardId, limit, page, sortBy, sortOrder } = req.query;
      const result = await ComplaintService.getComplaints(
        { status, priority, wardId },
        { limit, page, sortBy, sortOrder },
        req.tenantId
      );
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  static assign = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { complaintId, workerId } = req.body;
      const assignment = await ComplaintService.assignComplaint(complaintId, workerId, req.tenantId);
      res.send(assignment);
    } catch (error) {
      next(error);
    }
  };
}
