// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';

import { ProjectFile } from '@infra/database/repositories/projects/ProjectsKnex.mapper';
import { FoundationFile } from '@infra/database/repositories/foundations/FoundationsKnex.mapper';
import { UserFile } from '@infra/database/repositories/users/UsersKnex.mapper';
import { PersonFile } from '@infra/database/repositories/persons/PersonsKnex.mapper';
import { AffiliationFile } from '@infra/database/repositories/affiliations/AffiliationsKnex.mapper';
import { FileFile } from '@infra/database/repositories/files/FilesKnex.mapper';
import { TimelineFile } from '@infra/database/repositories/timelines/TimelinesKnex.mapper';
import { AttributeToPersonFile } from '@infra/database/repositories/persons/AttributesToPersonsKnex.mapper';
import { AttributeFile } from '@infra/database/repositories/persons/AttributesKnex.mapper';

declare module 'knex/types/tables' {
  interface Tables {
    users: UserFile;
    projects: ProjectFile;
    foundations: FoundationFile;
    persons: PersonFile;
    persons_affiliations: AffiliationFile;
    person_attribute_to_person: AttributeToPersonFile;
    persons_attributes: AttributeFile;
    files: FileFile;
    time_lines: TimelineFile;
  }
}
