import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../../config/config';
import { ApiError } from '../utils/ApiError';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = (...requiredPermissions: string[]) => async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Please authenticate');
    }

    const decoded: any = jwt.verify(token, config.jwt.secret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      include: { role: { include: { permissions: true } } }
    });

    if (!user || !user.isActive) {
      throw new ApiError(401, 'User not found or inactive');
    }

    // Check permissions
    if (requiredPermissions.length > 0) {
      const userPermissions = user.role.permissions.map(p => p.action);
      const hasPermission = requiredPermissions.every(rp => userPermissions.includes(rp));
      
      if (!hasPermission) {
        throw new ApiError(403, 'Forbidden: You do not have sufficient permissions');
      }
    }

    req.user = user;
    req.tenantId = user.orgId; // User is bound to their organization
    next();
  } catch (error) {
    next(new ApiError(401, 'Please authenticate'));
  }
};
