import 'reflect-metadata';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemory.repository';
import { makeUser } from '@test/factories/MakeUser';
import { GetUserService } from './GetUser.service';
import { UserNotFound } from '../errors/UserNotFound.error';

let usersRepository: UsersInMemoryRepository;

let sut: GetUserService;

describe('Get User', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();

    sut = new GetUserService(usersRepository);
  });

  it('should be able to get a user', async () => {
    const user = makeUser({ email: 'H3o5S@example.com', name: 'John Doe' });
    await usersRepository.create(user);

    const response = await sut.execute({
      email: 'H3o5S@example.com',
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toBeTruthy();

    if (response.isRight()) {
      expect(response.value.user).toBeTruthy();
      expect(response.value.user.id).toBeTruthy();
      expect(response.value.user.name).toBe('John Doe');
      expect(response.value.user.email).toBe('H3o5S@example.com');
    }
  });

  it('not should be able to get a user if not exists', async () => {
    const response = await sut.execute({
      email: 'H3o5S@example.com',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotFound);
  });
});
