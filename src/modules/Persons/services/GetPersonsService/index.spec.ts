import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { makeProject } from '@tests/projects/factories/makeProject';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { makePerson } from '@tests/persons/factories/makePerson';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { GetPersonsService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let snowflakeStructureInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;

let sut: GetPersonsService;

describe('Get persons', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    personsInMemoryRepository = new PersonsInMemoryRepository();
    snowflakeStructureInMemoryRepository =
      new SnowflakeStructuresInMemoryRepository(personsInMemoryRepository);
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructureInMemoryRepository,
      snowflakeStructureInMemoryRepository
    );
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository
    );

    sut = new GetPersonsService(
      usersInMemoryRepository,
      personsInMemoryRepository
    );
  });

  it('should be get persons of user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    for (let i = 0; i < 10; i++) {
      const newPerson = makePerson({
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      });

      personsInMemoryRepository.create(newPerson);
    }

    const result = await sut.execute({
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.persons).toHaveLength(10);
    }
  });

  it('should be get persons of user in between dirent projects', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const project2 = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-2')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);
    await projectsInMemoryRepository.create(project2);

    for (let i = 0; i < 10; i++) {
      const newPerson = makePerson({
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      });

      personsInMemoryRepository.create(newPerson);
    }

    for (let i = 0; i < 10; i++) {
      const newPerson = makePerson({
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-2'),
      });

      personsInMemoryRepository.create(newPerson);
    }

    const result = await sut.execute({
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.persons).toHaveLength(20);
    }
  });

  it('not should be able to get persons of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const user2 = makeUser({}, new UniqueEntityId('user-2'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const project2 = makeProject(
      {
        userId: new UniqueEntityId('user-2'),
      },
      new UniqueEntityId('project-2')
    );

    await usersInMemoryRepository.create(user);
    await usersInMemoryRepository.create(user2);
    await projectsInMemoryRepository.create(project);
    await projectsInMemoryRepository.create(project2);

    for (let i = 0; i < 10; i++) {
      const newPerson = makePerson({
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      });

      personsInMemoryRepository.create(newPerson);
    }

    for (let i = 0; i < 10; i++) {
      const newPerson = makePerson({
        userId: new UniqueEntityId('user-2'),
        projectId: new UniqueEntityId('project-2'),
      });

      personsInMemoryRepository.create(newPerson);
    }

    const result = await sut.execute({
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.persons).toHaveLength(10);
    }
  });

  it('not should be able to get persons if user not exists', async () => {
    const result = await sut.execute({
      userId: 'inexistent-user',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });
});
