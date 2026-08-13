import { eq, desc } from 'drizzle-orm';
import { projects } from '../schema';
import { getDb } from '../index';

export type ProjectRow = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export const listProjects = async () => {
  const db = getDb();
  return db.query.projects.findMany({
    orderBy: (table, { desc }) => [desc(table.createdAt)],
  });
};

export const createProject = async (input: ProjectInsert) => {
  const db = getDb();
  const [row] = await db.insert(projects).values(input).returning();
  return row;
};

export const updateProject = async (id: string, input: Partial<ProjectInsert>) => {
  const db = getDb();
  const [row] = await db
    .update(projects)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  return row;
};

export const updateProjectByCode = async (projectCode: string, input: Partial<ProjectInsert>) => {
  const db = getDb();
  const [row] = await db
    .update(projects)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(projects.projectCode, projectCode))
    .returning();
  return row;
};

export const deleteProject = async (id: string) => {
  const db = getDb();
  const [row] = await db.delete(projects).where(eq(projects.id, id)).returning();
  return row;
};

export const deleteProjectByCode = async (projectCode: string) => {
  const db = getDb();
  const [row] = await db.delete(projects).where(eq(projects.projectCode, projectCode)).returning();
  return row;
};