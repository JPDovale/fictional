import { KnexConnection } from "@infra/database";
import { getDatabaseImagesPath, getDatabasePath } from "@utils/getDatabasePath";
import { existsSync, mkdirSync } from "node:fs";

export class StarterDatabase {
  constructor() {
    if (!existsSync(getDatabasePath())) {
      mkdirSync(getDatabasePath());
    }

    if (!existsSync(getDatabaseImagesPath())) {
      mkdirSync(getDatabaseImagesPath());
    }

    const db = new KnexConnection()

    db.db.migrate.latest()
  }
}
