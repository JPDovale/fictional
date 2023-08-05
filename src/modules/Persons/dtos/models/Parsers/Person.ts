import { Person } from '@modules/Persons/models/Person';
import { PersonModelResponse } from '../types';

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
          apprenticeship: person.snowflakeStructureBase.apprenticeship,
          function: person.snowflakeStructureBase.function,
          motivation: person.snowflakeStructureBase.motivation,
          objective: person.snowflakeStructureBase.objective,
          obstacle: person.snowflakeStructureBase.obstacle,
          povByThisEye: person.snowflakeStructureBase.povByThisEye,
        }
      : null,
  };

  return personPartied;
}
