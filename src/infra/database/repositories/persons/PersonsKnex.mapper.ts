import { Person } from '@modules/persons/entities/Person';
import { PersonType } from '@modules/persons/entities/types';
import { PersonWithDetails } from '@modules/persons/valuesObjects/PersonWithDetails';
import { PersonWithParents } from '@modules/persons/valuesObjects/PersonWithParents';
import { Event } from '@modules/timelines/entities/Event';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';

export interface PersonFile {
  id: string;
  name: string | null;
  image: string | null;
  type: PersonType;
  created_at: Date;
  updated_at: Date | null;
  trashed_at: Date | null;
  project_id: string;
  affiliation_id: string | null;
  history: string | null;
}

type PersonWithParentsType = PersonFile & {
  father_id: string | null;
  mother_id: string | null;
};

type PersonWithDetailsType = PersonWithParentsType & {
  birthEvent: Event | null;
  deathEvent: Event | null;
};

@injectable()
export class PersonsKnexMapper extends RepositoryMapper<Person, PersonFile> {
  toDomain(raw: PersonFile): Person {
    return Person.create(
      {
        name: raw.name,
        type: raw.type,
        projectId: UniqueId.create(raw.project_id),
        affiliationId: raw.affiliation_id
          ? UniqueId.create(raw.affiliation_id)
          : null,
        image: raw.image,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        trashedAt: raw.trashed_at,
        history: raw.history,
      },
      UniqueId.create(raw.id)
    );
  }

  toPersistence(entity: Person): PersonFile {
    return {
      id: entity.id.toString(),
      type: entity.type,
      image: entity.image,
      name: entity.name,
      project_id: entity.projectId.toString(),
      affiliation_id: entity.affiliationId?.toString() ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      trashed_at: entity.trashedAt,
      history: entity.history,
    };
  }

  toDomainWithParrents(raw: PersonWithParentsType): PersonWithParents {
    return PersonWithParents.create({
      type: raw.type,
      name: raw.name,
      image: raw.image,
      projectId: UniqueId.create(raw.project_id),
      fatherId: raw.father_id ? UniqueId.create(raw.father_id) : null,
      motherId: raw.mother_id ? UniqueId.create(raw.mother_id) : null,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      trashedAt: raw.trashed_at,
      personId: UniqueId.create(raw.id),
      history: raw.history,
    });
  }

  toDomainWithDetails(raw: PersonWithDetailsType): PersonWithDetails {
    return PersonWithDetails.create({
      type: raw.type,
      name: raw.name,
      image: raw.image,
      projectId: UniqueId.create(raw.project_id),
      fatherId: raw.father_id ? UniqueId.create(raw.father_id) : null,
      motherId: raw.mother_id ? UniqueId.create(raw.mother_id) : null,
      birthEvent: raw.birthEvent,
      deathEvent: raw.deathEvent,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      trashedAt: raw.trashed_at,
      personId: UniqueId.create(raw.id),
      history: raw.history,
    });
  }
}
