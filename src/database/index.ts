import { getDatabasePath } from '@config/files/getDatabasePath';
import { knex } from 'knex';
import path from 'node:path';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: `${getDatabasePath()}/db.sqlite3`,
    database: 'magiscrita-dev',
  },
  useNullAsDefault: true,
  migrations: {
    directory: `${path.join(__dirname, 'migrations')}`,
  },
});

export { db };
