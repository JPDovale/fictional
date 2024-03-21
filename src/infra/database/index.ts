import { getDatabasePath } from '@utils/getDatabasePath'
import { knex } from 'knex'
import path from 'node:path'
import { injectable } from 'tsyringe'

export type KnexConfig = {
  db: knex.Knex
}

@injectable()
export class KnexConnection {
  db: knex.Knex

  constructor() {
    this.db = knex({
      client: 'sqlite3',
      connection: {
        filename: `${getDatabasePath()}/db.sqlite3`,
        database: 'fictional',
      },
      useNullAsDefault: true,
      migrations: {
        directory: `${path.join(__dirname, 'migrations')}`,
      },
    })
  }
}
