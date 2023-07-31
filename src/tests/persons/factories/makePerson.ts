import { fakerPT_BR } from '@faker-js/faker';
import { Person, PersonProps } from '@modules/Persons/models/Person';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';

export function makePerson(
  override: Partial<PersonProps> = {},
  id?: UniqueEntityId
) {
  const person = Person.create(
    {
      name: fakerPT_BR.person.firstName(),
      age: fakerPT_BR.number.int(),
      biographic: fakerPT_BR.person.bio(),
      userId: new UniqueEntityId(),
      projectId: new UniqueEntityId(),
      lastName: fakerPT_BR.person.lastName(),
      history: fakerPT_BR.person.bio(),
      ...override,
    },
    id
  );

  return person;
}
