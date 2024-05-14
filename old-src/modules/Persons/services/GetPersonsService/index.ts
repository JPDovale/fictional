import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Person } from '@modules/Persons/models/Person';
import { UserNotFount } from '@modules/Users/errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
}

type Response = Promise<
  Either<UserNotFount | UnexpectedError, { persons: Person[] }>
>;

@injectable()
export class GetPersonsService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository
  ) {}

  async execute({ userId }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const persons = await this.personsRepository.findByUserId(userId);
    return right({
      persons,
    });
  }
}
