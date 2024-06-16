import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemory.repository';
import { CreateUserService } from './CreateUser.service';
import { makeUser } from '@test/factories/MakeUser';
import { UserAlreadyExistsWithSameEmail } from '../errors/UserAlreadyExists.error';

let usersRepository: UsersInMemoryRepository;

let sut: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();

    sut = new CreateUserService(usersRepository);
  });

  it('should be able to create a user', async () => {
    const response = await sut.execute({
      name: 'John Doe',
      email: 'H3o5S@example.com',
    });

    expect(response.isRight()).toBe(true);
    expect(usersRepository.users).toHaveLength(1);
  });

  it('not should be able to create a user with same email', async () => {
    const user = makeUser({
      email: 'H3o5S@example.com',
    });

    await usersRepository.create(user);

    const response = await sut.execute({
      name: 'John Doe',
      email: 'H3o5S@example.com',
    });

    expect(response.isLeft()).toBe(true);
    expect(usersRepository.users).toHaveLength(1);
    expect(response.value).toBeInstanceOf(UserAlreadyExistsWithSameEmail);
  });
});
