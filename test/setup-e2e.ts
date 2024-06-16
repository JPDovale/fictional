import 'reflect-metadata';

import { knex } from 'knex';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { rmSync } from 'node:fs';

const dbName = `${randomUUID()}.sqlite3`;
const dbPath = path.join(__dirname, dbName);

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
    database: 'fictional',
  },
  useNullAsDefault: true,
  migrations: {
    directory: `${path.join(
      __dirname,
      '..',
      'src',
      'infra',
      'database',
      'migrations'
    )}`,
  },
});

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
  rmSync(dbPath);
});
