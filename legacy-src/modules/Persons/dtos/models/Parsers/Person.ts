import { Person } from '@modules/Persons/models/Person'
import { PersonModelResponse } from '../types'

export function PersonParser(person: Person): PersonModelResponse {
  const personPartied: PersonModelResponse = {
    id: person.id.toString(),
    name:
      person.name || person.lastName
        ? {
            firstName: person.name,
            lastName: person.lastName,
            fullName: `${person.name} ${person.lastName}`,
          }
        : null,
    age: person.age,
    biography: person.biographic,
    createdAt: person.createdAt,
    history: person.history,
    image: {
      alt: person.name ?? undefined,
      url: person.imageUrl,
    },
    projectId: person.projectId.toString(),
    updatedAt: person.updatedAt,
    userId: person.userId.toString(),
    snowflakeStructureBase: person.snowflakeStructureBase
      ? {
          apprenticeship: person.snowflakeStructureBase.apprenticeship ?? null,
          function: person.snowflakeStructureBase.function ?? null,
          motivation: person.snowflakeStructureBase.motivation ?? null,
          objective: person.snowflakeStructureBase.objective ?? null,
          obstacle: person.snowflakeStructureBase.obstacle ?? null,
          povByThisEye: person.snowflakeStructureBase.povByThisEye ?? null,
        }
      : null,
    snowflakeStructureExpansion: person.snowflakeStructureExpansion
      ? {
          apprenticeship:
            person.snowflakeStructureExpansion.apprenticeship ?? null,
          function: person.snowflakeStructureExpansion.function ?? null,
          motivation: person.snowflakeStructureExpansion.motivation ?? null,
          objective: person.snowflakeStructureExpansion.objective ?? null,
          obstacle: person.snowflakeStructureExpansion.obstacle ?? null,
          povByThisEye: person.snowflakeStructureExpansion.povByThisEye ?? null,
        }
      : null,
  }

  return personPartied
}
