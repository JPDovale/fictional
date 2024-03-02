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
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { GetProjectPersonsService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;

let sut: GetProjectPersonsService;

describe('Get project persons', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    personsInMemoryRepository = new PersonsInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    snowflakeStructuresInMemoryRepository =
      new SnowflakeStructuresInMemoryRepository(personsInMemoryRepository);
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructureInMemoryRepository,
      snowflakeStructuresInMemoryRepository
    );
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository
    );

    sut = new GetProjectPersonsService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
      personsInMemoryRepository
    );
  });

  it('should be get persons in one project', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
        features: Features.createFromObject({
          person: true,
        }),
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
      projectId: 'project-1',
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.persons).toHaveLength(10);
    }
  });

  it('not should be able to get persons of another project', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
        features: Features.createFromObject({
          person: true,
        }),
      },
      new UniqueEntityId('project-1')
    );
    const project2 = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
        features: Features.createFromObject({
          person: true,
        }),
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
      projectId: 'project-1',
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.persons).toHaveLength(10);
    }
  });

  it('not should be able to get persons if project not exists', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));

    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      projectId: 'inexistent-project',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });

  it('not should be able to get persons if user not exists', async () => {
    const project = makeProject({}, new UniqueEntityId('project-1'));

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'inexistent-user',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });

  it('not should be able to get persons on project if project are of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const user2 = makeUser({}, new UniqueEntityId('user-2'));

    const project = makeProject(
      {
        userId: new UniqueEntityId('user-2'),
        features: Features.createFromObject({
          person: true,
        }),
      },
      new UniqueEntityId('project-1')
    );
    await usersInMemoryRepository.create(user);
    await usersInMemoryRepository.create(user2);
    await projectsInMemoryRepository.create(project);

    for (let i = 0; i < 10; i++) {
      const newPerson = makePerson({
        userId: new UniqueEntityId('user-2'),
        projectId: new UniqueEntityId('project-1'),
      });

      personsInMemoryRepository.create(newPerson);
    }

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to get persons on project if project not implements persons feature', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        features: Features.createFromObject({
          person: false,
          'multi-book': true,
          city: true,
          family: true,
          inst: true,
          language: true,
          nation: true,
          planet: true,
        }),
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
      projectId: 'project-1',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UnexpectedError);
  });
});
