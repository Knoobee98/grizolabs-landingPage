import 'express-session';

declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        role: string;
      };
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    username?: string;
  }
}

export {};