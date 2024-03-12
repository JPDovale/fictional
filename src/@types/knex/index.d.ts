// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

import { ProjectFile } from '@infra/database/repositories/projects/ProjectsKnex.mapper'
import { FoundationFile } from '@infra/database/repositories/foundations/FoundationsKnex.mapper'
import { UserFile } from '@infra/database/repositories/users/UsersKnex.mapper'

declare module 'knex/types/tables' {
  interface Tables {
    users: UserFile
    projects: ProjectFile
    foundations: FoundationFile
  }
}
