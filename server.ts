import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

// Rate limiting for auth endpoints
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many auth attempts, please try again later.',
});

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Gemini Client safely on the server side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Admin user configuration (in production, use environment variables)
const ADMIN_CONFIG = {
  username: process.env.ADMIN_USERNAME || 'admin@grizolabs.app',
  password: process.env.ADMIN_PASSWORD || 'ChangeThis123!',
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET || 'fallback-secret-change-in-production');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Auth routes
const router = express.Router();

// Login endpoint
router.post('/login', authRateLimit, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate credentials
    if (username !== ADMIN_CONFIG.username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password (supports both bcrypt hash in env or plaintext fallback)
    const isBcryptHash = ADMIN_CONFIG.password.startsWith('$2');
    const isValidPassword = isBcryptHash
      ? await bcrypt.compare(password, ADMIN_CONFIG.password)
      : password === ADMIN_CONFIG.password;
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username, 
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      process.env.SESSION_SECRET || 'fallback-secret-change-in-production'
    );

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ success: true, user: { username, role: 'admin' } });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Protected admin info endpoint
router.get('/admin-info', authenticateToken, (req, res) => {
  res.json({ 
    user: { username: req.user.username, role: req.user.role },
    timestamp: new Date().toISOString()
  });
});

// Mount auth routes
app.use('/api/auth', router);

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Grizolabs IT Consulting Engine' });
});

// AI UMKM Architecture & Tech Advisor Endpoint
app.post('/api/ai-advisor', async (req, res) => {
  try {
    const { businessType, companySize, currentChallenge, budgetTier, targetFeatures } = req.body;

    if (!businessType || !currentChallenge) {
      return res.status(400).json({ error: 'businessType and currentChallenge are required.' });
    }

    const ai = getGeminiClient();

    const prompt = `You are Grizolabs' Lead Enterprise IT Architect specializing in UMKM (Micro, Small, Medium Enterprise) Digital Transformation in Indonesia & Southeast Asia.
Evaluate the following UMKM business setup and generate an actionable, highly professional IT Advisory Report:

Business Category: ${businessType}
Team / Scale: ${companySize || 'Micro / Small Enterprise'}
Current IT Challenge: ${currentChallenge}
Target Budget Tier: ${budgetTier || 'Affordable UMKM Tier'}
Requested Features: ${Array.isArray(targetFeatures) ? targetFeatures.join(', ') : targetFeatures || 'Full Digitalization'}

Provide your response in JSON matching this structure:
{
  "executiveSummary": "Concise 2-sentence strategic verdict for the UMKM owner",
  "readinessScore": 75,
  "recommendedArchitecture": {
    "title": "Clean, scalable architecture title (e.g. Serverless Cloud + Realtime POS + WA Automation)",
    "description": "High level system design overview",
    "components": [
      {"name": "Frontend / POS", "tech": "React PWA + Tailwind", "purpose": "Offline-first tablet & web store interface"},
      {"name": "Backend Service", "tech": "Express + Cloud Run", "purpose": "API Gateway and transactional logic"},
      {"name": "Database", "tech": "Cloud SQL PostgreSQL", "purpose": "Centralized multi-branch inventory & financial logs"},
      {"name": "Integrations", "tech": "WhatsApp Business API + Midtrans", "purpose": "Automated order receipts and digital payment"}
    ]
  },
  "phases": [
    {
      "phaseName": "Phase 1: Foundation & Data Migration",
      "duration": "1 - 2 Weeks",
      "deliverables": ["Excel/Manual Data cleanup", "Cloud Database Provisioning", "Core User Authentication"]
    },
    {
      "phaseName": "Phase 2: Core POS & Automation",
      "duration": "2 - 3 Weeks",
      "deliverables": ["Multi-branch Stock Sync", "WhatsApp Order Bot Setup", "Staff Training Material"]
    },
    {
      "phaseName": "Phase 3: Analytics & Go-Live",
      "duration": "1 Week",
      "deliverables": ["Financial Dashboard", "Automated Daily Backups", "Staff Handoff & 24/7 Monitoring Setup"]
    }
  ],
  "estimatedCostIDR": "Rp 12.500.000 - Rp 18.000.000",
  "monthlyOpsCostIDR": "Rp 250.000 - Rp 450.000 / month (Cloud server + WA API)",
  "roiEstimate": "Estimated 35% reduction in manual order loss and 2.5x faster checkout speed.",
  "risksAndMitigation": [
    {"risk": "Internet disconnection at store", "mitigation": "Offline-first IndexedDB local cache with background sync once reconnected"},
    {"risk": "Staff unfamiliarity with new POS", "mitigation": "1-click barcode flow with simplified 3-button touch UI"}
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite IT Solution Architect at Grizolabs. Output strictly valid JSON without markdown wrapping if possible, or standard clean JSON.',
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // Clean fallback if response contains markdown formatting
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({ success: true, advice: parsedData });
  } catch (error: any) {
    console.error('Error in /api/ai-advisor:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate AI IT Advisory report.',
    });
  }
});

// AI PRD Scope Generator Endpoint
app.post('/api/prd-generate', async (req, res) => {
  try {
    const { projectName, industry, selectedModules, techPreference } = req.body;

    const ai = getGeminiClient();

    const prompt = `Generate a Product Requirement Document (PRD) executive scope for:
Project Name: ${projectName}
Industry: ${industry}
Selected Modules: ${selectedModules?.join(', ')}
Tech Preference: ${techPreference}

Output JSON format:
{
  "prdTitle": "PRD Scope Specification",
  "version": "1.0-DRAFT",
  "objectives": ["Goal 1", "Goal 2", "Goal 3"],
  "userStories": [
    {"asA": "Store Manager", "iWant": "realtime stock alerts", "soThat": "I never run out of bestsellers"},
    {"asA": "Cashier", "iWant": "1-click WhatsApp digital receipt", "soThat": "we save paper and collect customer contacts"}
  ],
  "technicalSpecs": [
    "Database schema with full audit logging",
    "Rest API endpoints secured with JWT & Rate Limiting",
    "Responsive web frontend optimized for tablet & mobile touch"
  ],
  "estimatedSLA": "99.9% Uptime with automated snapshot backups"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const prdData = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    return res.json({ success: true, prd: prdData });
  } catch (error: any) {
    console.error('Error in /api/prd-generate:', error);
    return res.status(500).json({ success: false, error: error.message || 'PRD generation failed' });
  }
});

// Vite Middleware for Dev / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Grizolabs Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
