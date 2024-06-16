import { KnexConnection } from '@infra/database'
import { getDatabaseImagesPath, getDatabasePath } from '@utils/getDatabasePath'
import { existsSync, mkdirSync } from 'node:fs'

export class StarterDatabase {
  private readonly db: KnexConnection

  constructor() {
    if (!existsSync(getDatabasePath())) {
      mkdirSync(getDatabasePath(), { recursive: true })
    }

    if (!existsSync(getDatabaseImagesPath())) {
      mkdirSync(getDatabaseImagesPath(), { recursive: true })
    }

    this.db = new KnexConnection()
  }

  async migrate() {
    await this.db.db.migrate.latest()
  }
}
