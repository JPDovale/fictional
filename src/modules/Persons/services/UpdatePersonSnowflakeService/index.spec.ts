import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { makeProject } from '@tests/projects/factories/makeProject';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import { makePerson } from '@tests/persons/factories/makePerson';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { UpdatePersonHistoryService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;

let sut: UpdatePersonHistoryService;

describe('Update person history', () => {
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

    sut = new UpdatePersonHistoryService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
      personsInMemoryRepository
    );
  });

  it('should be able to update history of person', async () => {
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
    const person = makePerson(
      {
        history: 'Initial history',
        projectId: new UniqueEntityId('project-1'),
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      personId: 'person-1',
      history: 'An new history here',
    });

    expect(result.isRight()).toEqual(true);
    if (result.isRight()) {
      expect(result.value.person.history).toEqual('An new history here');
      expect(personsInMemoryRepository.persons[0].history).toEqual(
        'An new history here'
      );
      expect(result.value.person.history).not.toEqual('Initial history');
      expect(personsInMemoryRepository.persons[0].history).not.toEqual(
        'Initial history'
      );
      expect(result.value.person.history).not.includes('Initial history');
      expect(personsInMemoryRepository.persons[0].history).not.includes(
        'Initial history'
      );
    }
  });

  it('not should be able to update history person if not exists one project to person', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const person = makePerson(
      {
        history: 'Initial history',
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('inexistent-project'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      personId: 'person-1',
      projectId: 'inexistent-project',
      userId: 'user-1',
      history: 'An new history here',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
    expect(personsInMemoryRepository.persons[0].history).toEqual(
      'Initial history'
    );
  });

  it('not should be able to update history of person if user not exists', async () => {
    const project = makeProject({}, new UniqueEntityId('project-1'));
    const person = makePerson(
      {
        history: 'Initial history',
        userId: new UniqueEntityId('inexistent-user'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('person-1')
    );

    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      personId: 'person-1',
      projectId: 'project-1',
      userId: 'inexistent-user',
      history: 'An new history here',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
    expect(personsInMemoryRepository.persons[0].history).toEqual(
      'Initial history'
    );
  });

  it('not should be able to update history of person if project not implements person feature', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        features: Features.createFromObject({
          person: false,
          'multi-book': true,
        }),
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const person = makePerson(
      {
        history: 'Initial history',
        projectId: new UniqueEntityId('project-1'),
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      personId: 'person-1',
      history: 'An new history here',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UnexpectedError);
    expect(personsInMemoryRepository.persons[0].history).toEqual(
      'Initial history'
    );
  });

  it('not should be able to update history of person if project not are from user', async () => {
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
    const person = makePerson(
      {
        history: 'Initial history',
        projectId: new UniqueEntityId('project-1'),
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await usersInMemoryRepository.create(user2);
    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      personId: 'person-1',
      history: 'An new history here',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
    expect(personsInMemoryRepository.persons[0].history).toEqual(
      'Initial history'
    );
  });

  it('not should be able to update history of person if person not are from user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const user2 = makeUser({}, new UniqueEntityId('user-2'));
    const project = makeProject(
      {
        userId: new UniqueEntityId('user-1'),
        features: Features.createFromObject({
          person: true,
        }),
      },
      new UniqueEntityId('project-1')
    );
    const person = makePerson(
      {
        history: 'Initial history',
        projectId: new UniqueEntityId('project-1'),
        userId: new UniqueEntityId('user-2'),
      },
      new UniqueEntityId('person-1')
    );

    await usersInMemoryRepository.create(user);
    await usersInMemoryRepository.create(user2);
    await projectsInMemoryRepository.create(project);
    await personsInMemoryRepository.create(person);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      personId: 'person-1',
      history: 'An new history here',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
    expect(personsInMemoryRepository.persons[0].history).toEqual(
      'Initial history'
    );
  });
});
