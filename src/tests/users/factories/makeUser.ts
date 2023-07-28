import { fakerPT_BR } from '@faker-js/faker';
import { User, UserProps } from '@modules/Users/models/User';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId
) {
  const user = User.create(
    {
      name: fakerPT_BR.person.fullName(),
      email: fakerPT_BR.internet.email(),
      age: fakerPT_BR.number.int({
        min: 10,
        max: 90,
      }),
      username: fakerPT_BR.internet.userName(),
      sex: fakerPT_BR.person.sexType(),
      ...override,
    },
    id
  );

  return user;
}
