// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'
import { UserFile } from '@infra/database/repositories/users/UsersKenx.mapper'

declare module 'knex/types/tables' {
  interface Tables {
    users: UserFile
    // projects: ProjectFile;
  }
}
