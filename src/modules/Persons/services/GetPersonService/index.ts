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
    const findUserResponse = await this.usersRepository.findById(userId);
    if (!findUserResponse.value || findUserResponse.isLeft()) {
      return left(new UserNotFount());
    }

    const findPersonResponse = await this.personsRepository.findById(personId);

    if (!findPersonResponse.value || findPersonResponse.isLeft()) {
      return left(new ResourceNotFount());
    }

    const user = findUserResponse.value;
    const person = findPersonResponse.value;

    if (!person.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    if (findPersonResponse.isRight()) {
      return right({
        person: findPersonResponse.value,
      });
    }

    return left(new UnexpectedError());
  }
}
