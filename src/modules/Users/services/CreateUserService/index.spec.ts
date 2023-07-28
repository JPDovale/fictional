import 'reflect-metadata';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { CreateUserService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;

let sut: CreateUserService;

describe('Create user', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();

    sut = new CreateUserService(usersInMemoryRepository);
  });

  it('should be able to create user', async () => {
    const result = await sut.execute({
      name: 'Johnny',
      email: 'jon@jon.com',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(usersInMemoryRepository.users[0].id).toEqual(result.value.user.id);
    }
  });
});
