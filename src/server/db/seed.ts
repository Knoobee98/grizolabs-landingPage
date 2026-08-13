import 'dotenv/config';
import { count } from 'drizzle-orm';
import { db } from './index';
import { projects, complaints } from './schema';
import { INITIAL_ADMIN_PROJECTS, INITIAL_CLIENT_COMPLAINTS } from '../../data/mockData';
import { projectToInsert, complaintToInsert } from './mappers';

async function seed() {
  if (!db) {
    console.error('[seed] DATABASE_URL is not configured. Aborting.');
    process.exit(1);
  }

  const [pCount] = await db.select({ n: count() }).from(projects);
  if (pCount.n === 0) {
    for (const p of INITIAL_ADMIN_PROJECTS) {
      await db.insert(projects).values(projectToInsert(p)).onConflictDoNothing();
    }
    console.log(`[seed] Inserted ${INITIAL_ADMIN_PROJECTS.length} projects`);
  } else {
    console.log(`[seed] Projects table already has ${pCount.n} rows — skipping`);
  }

  const [cCount] = await db.select({ n: count() }).from(complaints);
  if (cCount.n === 0) {
    for (const c of INITIAL_CLIENT_COMPLAINTS) {
      await db.insert(complaints).values(complaintToInsert(c)).onConflictDoNothing();
    }
    console.log(`[seed] Inserted ${INITIAL_CLIENT_COMPLAINTS.length} complaints`);
  } else {
    console.log(`[seed] Complaints table already has ${cCount.n} rows — skipping`);
  }
}

seed()
  .then(() => {
    console.log('[seed] Done');
    process.exit(0);
  })
  .catch((error) => {
    console.error('[seed] Failed:', error);
    process.exit(1);
  });
