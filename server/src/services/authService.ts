import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ApiError } from '../core/utils/ApiError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

export class AuthService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true, organization: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password || ''))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const tokens = this.generateAuthTokens(user);
    return { user, tokens };
  }

  static generateAuthTokens(user: any) {
    const accessTokenExpires = Math.floor(Date.now() / 1000) + (Number(config.jwt.accessExpirationMinutes) * 60);
    const accessToken = this.generateToken(user.id, accessTokenExpires, 'ACCESS');

    return {
      access: {
        token: accessToken,
        expires: new Date(accessTokenExpires * 1000),
      },
    };
  }

  static generateToken(userId: string, expires: number, type: string) {
    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: expires,
      type,
    };
    return jwt.sign(payload, config.jwt.secret);
  }
}
