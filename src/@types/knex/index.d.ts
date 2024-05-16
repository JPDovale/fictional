// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

import { ProjectFile } from '@infra/database/repositories/projects/ProjectsKnex.mapper'
import { FoundationFile } from '@infra/database/repositories/foundations/FoundationsKnex.mapper'
import { UserFile } from '@infra/database/repositories/users/UsersKnex.mapper'
import { PersonFile } from '@infra/database/repositories/persons/PersonsKnex.mapper'
import { AffiliationFile } from '@infra/database/repositories/affiliations/AffiliationsKnex.mapper'
import { FileFile } from '@infra/database/repositories/files/FilesKnex.mapper'

declare module 'knex/types/tables' {
  interface Tables {
    users: UserFile
    projects: ProjectFile
    foundations: FoundationFile
    persons: PersonFile
    affiliation: AffiliationFile
    file: FileFile
  }
}
