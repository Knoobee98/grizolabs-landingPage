import { eq, desc } from 'drizzle-orm';
import { complaints } from '../schema';
import { getDb } from '../index';

export type ComplaintRow = typeof complaints.$inferSelect;
export type ComplaintInsert = typeof complaints.$inferInsert;

export const listComplaints = async () => {
  const db = getDb();
  return db.query.complaints.findMany({
    orderBy: (table, { desc }) => [desc(table.createdAt)],
  });
};

export const createComplaint = async (input: ComplaintInsert) => {
  const db = getDb();
  const [row] = await db.insert(complaints).values(input).returning();
  return row;
};

export const updateComplaint = async (id: string, input: Partial<ComplaintInsert>) => {
  const db = getDb();
  const [row] = await db
    .update(complaints)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(complaints.id, id))
    .returning();
  return row;
};