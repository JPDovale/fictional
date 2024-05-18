import { KnexConnection } from "@infra/database";
import { getDatabaseImagesPath, getDatabasePath } from "@utils/getDatabasePath";
import { existsSync, mkdirSync } from "node:fs";

export class StarterDatabase {
  constructor() {
    if (!existsSync(getDatabasePath())) {
      mkdirSync(getDatabasePath(), { recursive: true });
    }

    if (!existsSync(getDatabaseImagesPath())) {
      mkdirSync(getDatabaseImagesPath(), { recursive: true });
    }

    const db = new KnexConnection()

    db.db.migrate.latest()
  }
}
