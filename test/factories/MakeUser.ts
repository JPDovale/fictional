import { fakerPT_BR } from '@faker-js/faker';
import { User, UserProps } from '@modules/users/entities/User';
import { Username } from '@modules/users/valueObjects/Username';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueId
): User {
  const user = User.create(
    {
      email: fakerPT_BR.internet.email(),
      name: fakerPT_BR.person.fullName(),
      username: Username.create(fakerPT_BR.internet.userName()),
      ...override,
    },
    id
  );

  return user;
}
