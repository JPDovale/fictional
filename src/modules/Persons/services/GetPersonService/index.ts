import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Person } from '@modules/Persons/models/Person';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
  personId: string;
}

type Response = Promise<
  Either<
    UserNotFount | ResourceNotFount | UnexpectedError | PermissionDenied,
    { person: Person }
  >
>;

@injectable()
export class GetPersonService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository
  ) {}

  async execute({ personId, userId }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const person = await this.personsRepository.findById(personId);
    if (!person) {
      return left(new ResourceNotFount());
    }

    if (!person.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    return right({
      person,
    });
  }
}
