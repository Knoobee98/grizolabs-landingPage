import express from 'express';
import { Request, Response } from 'express';
import { authRateLimit, authenticateToken, signAuthToken } from '../middleware/auth';
import { findAdmin, verifyPassword } from '../services/users';
import { logAudit } from '../services/auditLog';
import { config } from '../config';

export const authRouter = express.Router();

const fail = (res: Response) => res.status(401).json({ error: 'Invalid credentials' });

// Login endpoint
authRouter.post('/login', authRateLimit, async (req: Request, res: Response) => {
  const ip = req.ip;
  try {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const user = findAdmin(username);

    if (!user || !(await verifyPassword(user, password))) {
      logAudit({ action: 'login', username, ip, success: false });
      return fail(res);
    }

    const token = signAuthToken(user.username, 'admin');
    logAudit({ action: 'login', username: user.username, ip, success: true });

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: { username: user.username, role: 'admin' } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout endpoint
authRouter.post('/logout', (req: Request, res: Response) => {
  const username = req.user?.username;
  res.clearCookie('token');
  logAudit({ action: 'logout', username, ip: req.ip, success: true });
  res.json({ success: true });
});

// Protected admin info endpoint
authRouter.get('/admin-info', authenticateToken, (req: Request, res: Response) => {
  const username = req.user!.username;
  logAudit({ action: 'admin-info', username, ip: req.ip, success: true });
  res.json({
    user: { username, role: req.user!.role },
    timestamp: new Date().toISOString(),
  });
});
