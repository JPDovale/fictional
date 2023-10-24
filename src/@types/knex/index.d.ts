// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';
import { BookFile } from '@database/repositories/Book/types';
import { UserFile } from '@database/repositories/User/types';
import { ProjectFile } from '@database/repositories/Project/types';
import { ThreeActsStructureFile } from '@database/repositories/ThreeActsStructure/types';
import { PersonFile } from '@database/repositories/Person/types';
import { SnowflakeStructureFile } from '@database/repositories/SnowflakeStructure/types';

declare module 'knex/types/tables' {
  interface Tables {
    books: BookFile;
    users: UserFile;
    projects: ProjectFile;
    snowflake_structures: SnowflakeStructureFile;
    three_acts_structures: ThreeActsStructureFile;
    persons: PersonFile;
  }
}
