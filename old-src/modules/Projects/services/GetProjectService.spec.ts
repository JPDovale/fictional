import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { makeProject } from '@tests/projects/factories/makeProject';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { UserNotFount } from '@modules/Users/errors/UserNotFound';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { makeBook } from '@tests/books/factories/makeBook';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { makeThreeActsStructure } from '@tests/threeActsStructures/factories/makeThreeActsStructure';
import { makePerson } from '@tests/persons/factories/makePerson';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
// import { makeSnowflakeStructure } from '@tests/snowflakeStructures/factories/makeSnowflakeStructure';
import { GetProjectService } from '../GetProjectService';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;
let sut: GetProjectService;

describe('Get project', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    threeActsStructureInMemoryRepository =
      new ThreeActsStructureInMemoryRepository();
    snowflakeStructuresInMemoryRepository =
      new SnowflakeStructuresInMemoryRepository(personsInMemoryRepository);
    booksInMemoryRepository = new BooksInMemoryRepository(
      threeActsStructureInMemoryRepository,
      snowflakeStructuresInMemoryRepository
    );
    personsInMemoryRepository = new PersonsInMemoryRepository();
    projectsInMemoryRepository = new ProjectsInMemoryRepository(
      booksInMemoryRepository
    );

    sut = new GetProjectService(
      projectsInMemoryRepository,
      usersInMemoryRepository,
      booksInMemoryRepository,
      personsInMemoryRepository,
      threeActsStructureInMemoryRepository,
      snowflakeStructuresInMemoryRepository
    );
  });

  it('should be get one project', async () => {
    const user = makeUser({});
    const project = makeProject({
      userId: user.id,
    });

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    if (result.isRight()) {
      expect(result.value.project.id.toString()).toEqual(project.id.toString());
    }
  });

  it('should be get one project with persons and books', async () => {
    const user = makeUser();
    const project = makeProject({
      userId: user.id,
    });
    const book = makeBook({
      projectId: project.id,
      userId: user.id,
    });
    const threeActsStructure = makeThreeActsStructure({
      implementorId: book.id,
    });
    book.threeActsStructure = threeActsStructure;

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);
    await booksInMemoryRepository.create(book);
    await threeActsStructureInMemoryRepository.create(threeActsStructure);

    for (let i = 0; i < 10; i++) {
      const person = makePerson({
        projectId: project.id,
        userId: user.id,
      });

      personsInMemoryRepository.create(person);
    }

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.project.books.currentItems).toHaveLength(1);
      expect(
        result.value.project.books.currentItems[0].threeActsStructure
      ).toEqual(threeActsStructure);
      expect(result.value.project.persons.currentItems).toHaveLength(10);
    }
  });

  // it('should be get one project with persons and books with structure snowflake', async () => {
  //   const user = makeUser();
  //   const project = makeProject({
  //     structure: 'snowflake',
  //     userId: user.id,
  //   });
  //   const book = makeBook({
  //     structure: 'snowflake',
  //     projectId: project.id,
  //     userId: user.id,
  //   });
  //   const snowflakeStructure = makeSnowflakeStructure({
  //     implementorId: book.id,
  //   });
  //   book.snowflakeStructure = snowflakeStructure;

  //   await usersInMemoryRepository.create(user);
  //   await projectsInMemoryRepository.create(project);
  //   await booksInMemoryRepository.create(book);

  //   for (let i = 0; i < 10; i++) {
  //     const person = makePerson({
  //       projectId: project.id,
  //       userId: user.id,
  //     });

  //     personsInMemoryRepository.create(person);
  //   }

  //   const result = await sut.execute({
  //     projectId: project.id.toString(),
  //     userId: user.id.toString(),
  //   });

  //   expect(result.isRight()).toEqual(true);

  //   if (result.isRight()) {
  //     expect(result.value.project.books.currentItems).toHaveLength(1);
  //     expect(
  //       result.value.project.books.currentItems[0].snowflakeStructure?.id
  //     ).toEqual(snowflakeStructure.id);
  //     expect(result.value.project.persons.currentItems).toHaveLength(10);
  //   }
  // });

  it('not should be able to get project of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject({
      userId: new UniqueEntityId('user-2'),
    });

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to get project if user not exists', async () => {
    const project = makeProject({
      userId: new UniqueEntityId('inexistent-user'),
    });

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'inexistent-user',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });

  it('not should be able to get project if project not exists', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));

    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      projectId: 'inexistent-project',
      userId: 'user-1',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });
});
