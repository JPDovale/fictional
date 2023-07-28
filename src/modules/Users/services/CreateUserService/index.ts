import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { User } from '@modules/Users/models/User';
import { ResourceNotCreated } from '@shared/errors/ResourceNotCreated';

interface IRequest {
  name: string;
  email: string;
  sex?: string;
  age?: number;
  username?: string;
  avatarUrl?: string;
}

type IResponse = Either<ResourceNotCreated, { user: User }>;

@injectable()
export class CreateUserService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    age,
    sex,
    username,
    avatarUrl,
  }: IRequest): Promise<IResponse> {
    const getUserResponse = await this.usersRepository.findByEmail(email);

    if (getUserResponse.value instanceof User) {
      return right({
        user: getUserResponse.value,
      });
    }

    const user = User.create({
      name,
      email,
      age,
      sex,
      username,
      avatarUrl,
    });
    const createUserResponse = await this.usersRepository.create(user);

    if (createUserResponse.isLeft()) {
      return left(new ResourceNotCreated());
    }

    return right({
      user,
    });
  }
}
