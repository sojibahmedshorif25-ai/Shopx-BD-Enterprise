import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.js';

export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
  userRole?: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_shopx';
    const decoded = jwt.verify(token, secret) as { id: string; role: string };

    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: 'User not found or deactivated.' });
      return;
    }

    req.user = user;
    req.userId = user._id.toString();
    req.userRole = user.role;
    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      const secret = process.env.JWT_SECRET || 'fallback_secret_shopx';
      const decoded = jwt.verify(token, secret) as { id: string; role: string };
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        req.userId = user._id.toString();
        req.userRole = user.role;
      }
    }
  } catch {
    // Ignore invalid tokens for optional authentication
  }
  next();
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.userRole}' does not have permission.`,
      });
      return;
    }
    next();
  };
};
