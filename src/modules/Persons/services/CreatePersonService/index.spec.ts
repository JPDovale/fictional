import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { makeProject } from '@tests/projects/factories/makeProject';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { CreatePersonService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;

let sut: CreatePersonService;

describe('Create person', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructureInMemoryRepository
    );
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository
    );
    personsInMemoryRepository = new PersonsInMemoryRepository();

    sut = new CreatePersonService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
      personsInMemoryRepository
    );
  });

  it('should be able to create an new person in project', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject({}, new UniqueEntityId('project-1'));

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      name: 'Person',
      lastName: 'test',
      biographic: 'This is one bio of the person test. He like tests',
      projectId: 'project-1',
      userId: 'user-1',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(personsInMemoryRepository.persons[0].id).toEqual(
        result.value.person.id
      );
      expect(personsInMemoryRepository.persons[0].userId.toString()).toEqual(
        'user-1'
      );
    }
  });

  it('not should be able to create an new person if project not exists', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));

    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      name: 'Person',
      lastName: 'test',
      biographic: 'This is one bio of the person test. He like tests',
      projectId: 'inexistent-project',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(personsInMemoryRepository.persons.length).toEqual(0);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });

  it('not should be able to create an new person if user not exists', async () => {
    const project = makeProject({}, new UniqueEntityId('project-1'));

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      name: 'Person',
      lastName: 'test',
      biographic: 'This is one bio of the person test. He like tests',
      projectId: 'project-1',
      userId: 'inexistent-user',
    });

    expect(result.isLeft()).toEqual(true);
    expect(personsInMemoryRepository.persons.length).toEqual(0);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });
});
