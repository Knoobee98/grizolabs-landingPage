import express from 'express';
import { Request, Response } from 'express';
import { getGeminiClient } from '../services/gemini';

export const aiAdvisorRouter = express.Router();

aiAdvisorRouter.post('/', async (req: Request, res: Response) => {
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