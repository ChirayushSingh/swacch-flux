import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const tenantMiddleware = (req: any, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'];

  if (!tenantId) {
    // For public routes like login/signup, we might not have a tenant ID
    // But for protected municipal routes, it's mandatory
    return next();
  }

  req.tenantId = tenantId as string;
  next();
};

export const requireTenant = (req: any, res: Response, next: NextFunction) => {
  if (!req.tenantId) {
    return next(new ApiError(400, 'Organization context (Tenant ID) is required for this operation'));
  }
  next();
};
