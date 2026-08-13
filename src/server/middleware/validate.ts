import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({
        error: 'Validation failed',
        details: formattedErrors,
      });
    }
    req.body = result.data;
    return next();
  };
}

export const createLeadSchema = z.object({
  leadType: z.enum(['consultation', 'diagnostic', 'prd']),
  businessName: z.string().trim().max(255).nullable().optional(),
  contactName: z.string().trim().max(255).nullable().optional(),
  whatsapp: z.string().trim().max(100).nullable().optional(),
  email: z.string().trim().email('Invalid email address').max(320).nullable().optional().or(z.literal('')),
  channel: z.enum(['whatsapp', 'meeting']).nullable().optional(),
  preferredDate: z.string().trim().max(100).nullable().optional(),
  preferredTime: z.string().trim().max(100).nullable().optional(),
  notes: z.string().trim().max(4000).nullable().optional(),
  sourceData: z.record(z.unknown()).nullable().optional(),
});
