import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/db.sqlite3',
      database: 'magiscrita-dev',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
