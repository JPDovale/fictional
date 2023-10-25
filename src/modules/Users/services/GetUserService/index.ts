import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { User } from '@modules/Users/models/User';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

type IResponse = Either<ResourceNotFount, { user: User }>;

@injectable()
export class GetUserService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFount());
    }

    return right({ user });
  }
}
