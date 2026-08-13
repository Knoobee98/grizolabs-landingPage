import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const authRateLimit = rateLimit({
  windowMs: config.rateLimit.apiWindowMs,
  max: config.rateLimit.authMax,
  message: 'Too many auth attempts, please try again later.',
});

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.sessionSecret);
    req.user = decoded as { username: string; role: string };
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const signAuthToken = (username: string, role = 'admin'): string => {
  return jwt.sign(
    {
      username,
      role,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    },
    config.sessionSecret
  );
};