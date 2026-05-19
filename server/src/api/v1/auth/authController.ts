import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../services/authService';
import httpStatus from 'http-status';

export class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    // In stateless JWT, logout is usually handled by client clearing tokens
    // but can include token blacklisting in production
    res.status(httpStatus.NO_CONTENT).send();
  };
}
