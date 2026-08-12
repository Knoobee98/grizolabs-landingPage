import express from 'express';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { config } from '../config';
import { authRateLimit, authenticateToken, signAuthToken } from '../middleware/auth';

export const authRouter = express.Router();

// Login endpoint
authRouter.post('/login', authRateLimit, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username !== config.admin.username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Supports both bcrypt hash in env or plaintext fallback
    const isBcryptHash = config.admin.password.startsWith('$2');
    const isValidPassword = isBcryptHash
      ? await bcrypt.compare(password, config.admin.password)
      : password === config.admin.password;

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signAuthToken(username, 'admin');

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: { username, role: 'admin' } });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout endpoint
authRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Protected admin info endpoint
authRouter.get('/admin-info', authenticateToken, (req: Request, res: Response) => {
  res.json({
    user: { username: req.user!.username, role: req.user!.role },
    timestamp: new Date().toISOString(),
  });
});