import { getDatabasePath } from '@config/files/getDatabasePath';
import type { Knex } from 'knex';
import path from 'path';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${getDatabasePath()}/db.sqlite3`,
      database: 'magiscrita',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${path.join(__dirname, 'src', 'database', 'migrations')}`,
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
