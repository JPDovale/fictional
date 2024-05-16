import { Person } from '@modules/persons/entities/Person'
import { PersonType } from '@modules/persons/entities/types'
import { PersonWithParents } from '@modules/persons/valuesObjects/PersonWithParents'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface PersonFile {
  id: string
  name: string | null
  image: string | null
  birth_date: string | null
  death_date: string | null
  type: PersonType
  created_at: Date
  updated_at: Date | null
  project_id: string
  affiliation_id: string | null
}

type PersonWithParentsType = PersonFile & {
  father_id: string | null
  mother_id: string | null
}

@injectable()
export class PersonsKnexMapper extends RepositoryMapper<Person, PersonFile> {
  toDomain(raw: PersonFile): Person {
    return Person.create(
      {
        name: raw.name,
        type: raw.type,
        projectId: UniqueId.create(raw.project_id),
        birthDate: raw.birth_date,
        deathDate: raw.death_date,
        affiliationId: raw.affiliation_id
          ? UniqueId.create(raw.affiliation_id)
          : null,
        image: raw.image,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: Person): PersonFile {
    return {
      id: entity.id.toString(),
      type: entity.type,
      image: entity.image,
      name: entity.name,
      birth_date: entity.birthDate,
      death_date: entity.deathDate,
      project_id: entity.projectId.toString(),
      affiliation_id: entity.affiliationId?.toString() ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    }
  }

  toDomainWithParrents(raw: PersonWithParentsType): PersonWithParents {
    return PersonWithParents.create({
      type: raw.type,
      name: raw.name,
      image: raw.image,
      birthDate: raw.birth_date,
      deathDate: raw.death_date,
      projectId: UniqueId.create(raw.project_id),
      fatherId: raw.father_id ? UniqueId.create(raw.father_id) : null,
      motherId: raw.mother_id ? UniqueId.create(raw.mother_id) : null,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      personId: UniqueId.create(raw.id),
    })
  }
}
