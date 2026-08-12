import express from 'express';
import { Request, Response } from 'express';
import { getGeminiClient } from '../services/gemini';

export const prdGeneratorRouter = express.Router();

prdGeneratorRouter.post('/', async (req: Request, res: Response) => {
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