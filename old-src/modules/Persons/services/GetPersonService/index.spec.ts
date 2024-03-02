import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { makeProject } from '@tests/projects/factories/makeProject';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { UserNotFount } from '@modules/Users/errors/UserNotFound';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { makePerson } from '@tests/persons/factories/makePerson';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { GetPersonService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let snowflakeStructureInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;

let sut: GetPersonService;

describe('Get person', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    personsInMemoryRepository = new PersonsInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    snowflakeStructureInMemoryRepository =
      new SnowflakeStructuresInMemoryRepository(personsInMemoryRepository);
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructureInMemoryRepository,
      snowflakeStructureInMemoryRepository
    );
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository
    );

    sut = new GetPersonService(
      usersInMemoryRepository,
      personsInMemoryRepository
    );
  });

  it('should be get one person', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const person = makePerson(
      {
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      personId: 'person-1',
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.person).toEqual(person);
    }
  });

  it('not should be able to get person if he not exist', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      personId: 'inexistent-person',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });

  it('not should be able to get person if he not are of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const user2 = makeUser({}, new UniqueEntityId('user-2'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const person = makePerson(
      {
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await usersInMemoryRepository.create(user2);
    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      personId: 'person-1',
      userId: 'user-2',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to get person if user not exist', async () => {
    const project = makeProject(
      {
        userId: new UniqueEntityId('inexistent-user'),
      },
      new UniqueEntityId('project-1')
    );
    const person = makePerson(
      {
        userId: new UniqueEntityId('inexistent-user'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('person-1')
    );

    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      personId: 'person-1',
      userId: 'inexistent-user',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });
});
