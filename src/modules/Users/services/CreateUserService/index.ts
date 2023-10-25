import InjectableDependencies from '@shared/container/types';
import { Either, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { User } from '@modules/Users/models/User';

interface IRequest {
  name: string;
  email: string;
  sex?: string;
  age?: number;
  username?: string;
  avatarUrl?: string;
}

type IResponse = Either<null, { user: User }>;

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
    const userExistes = await this.usersRepository.findByEmail(email);
    if (userExistes instanceof User) {
      return right({
        user: userExistes,
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

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
