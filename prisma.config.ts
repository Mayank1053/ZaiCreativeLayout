import 'dotenv/config';
import type { PrismaConfig } from "prisma";
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'bun prisma/seed-phases.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
}) satisfies PrismaConfig;;
