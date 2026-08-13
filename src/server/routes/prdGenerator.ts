import express from 'express';
import { Request, Response } from 'express';
import { getGeminiClient } from '../services/gemini';

export const prdGeneratorRouter = express.Router();

prdGeneratorRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { projectName, industry, selectedModules, techPreference } = req.body;

    const sanitize = (text: unknown, maxLen = 200): string => {
      if (typeof text !== 'string') return '';
      return text
        .replace(/[\{\}\[\]\<\>\`\$\\]/g, '')
        .trim()
        .slice(0, maxLen);
    };

    const cleanProjectName = sanitize(projectName, 100) || 'Aplikasi UMKM';
    const cleanIndustry = sanitize(industry, 100) || 'Retail / Services';
    const cleanTech = sanitize(techPreference, 100) || 'Web / POS';
    const cleanModules = Array.isArray(selectedModules)
      ? selectedModules.map((m) => sanitize(m, 50)).filter(Boolean).join(', ')
      : 'Fitur Utama POS';

    const ai = getGeminiClient();

    const prompt = `Generate a Product Requirement Document (PRD) executive scope for:
Project Name: ${cleanProjectName}
Industry: ${cleanIndustry}
Selected Modules: ${cleanModules}
Tech Preference: ${cleanTech}

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