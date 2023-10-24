import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { makeProject } from '@tests/projects/factories/makeProject';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { ProjectBookList } from '@modules/Projects/models/ProjectBookList';
import { makeBook } from '@tests/books/factories/makeBook';
import { makeThreeActsStructure } from '@tests/threeActsStructures/factories/makeThreeActsStructure';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { UpdateThreeActsStructureService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;

let sut: UpdateThreeActsStructureService;

describe('Update three acts structure', () => {
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

    sut = new UpdateThreeActsStructureService(
      projectsInMemoryRepository,
      usersInMemoryRepository,
      threeActsStructureInMemoryRepository,
      booksInMemoryRepository
    );
  });

  it('should be able to update an three acts structure', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        type: 'book',
        structure: 'three-acts',
        features: Features.createFromObject({
          'multi-book': false,
        }),
        books: new ProjectBookList(),
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const book = makeBook(
      {
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('book-1')
    );
    const threeActsStructure = makeThreeActsStructure(
      {},
      new UniqueEntityId('three-acts-structure-1')
    );

    book.threeActsStructure = threeActsStructure;
    project.books.add(book);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].act_1
      ).toEqual('Test');
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].act_2
      ).toEqual('over');
      expect(
        threeActsStructureInMemoryRepository.threeActsStructures[0].act_3
      ).toEqual('update');
    }
  });

  it('should be able to update an three acts structure in projects with multi-book implementation', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        type: 'book',
        structure: 'three-acts',
        features: Features.createFromObject({
          'multi-book': true,
        }),
        books: new ProjectBookList(),
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );
    const book = makeBook(
      {
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('book-1')
    );
    const threeActsStructure = makeThreeActsStructure(
      {},
      new UniqueEntityId('three-acts-structure-1')
    );
    const book2 = makeBook(
      {
        userId: new UniqueEntityId('user-1'),
        projectId: new UniqueEntityId('project-1'),
      },
      new UniqueEntityId('book-2')
    );
    const threeActsStructure2 = makeThreeActsStructure(
      {},
      new UniqueEntityId('three-acts-structure-2')
    );

    book.threeActsStructure = threeActsStructure;
    book2.threeActsStructure = threeActsStructure2;
    project.books.add(book);
    project.books.add(book2);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: 'user-1',
      bookId: 'book-2',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      const threeActsStructureUpdatedSaved =
        await threeActsStructureInMemoryRepository.findById(
          'three-acts-structure-2'
        );

      expect(threeActsStructureUpdatedSaved.isRight()).toEqual(true);

      if (threeActsStructureUpdatedSaved.isRight()) {
        expect(threeActsStructureUpdatedSaved.value!.act1).toEqual('Test');
        expect(threeActsStructureUpdatedSaved.value!.act2).toEqual('over');
        expect(threeActsStructureUpdatedSaved.value!.act3).toEqual('update');
      }
    }
  });

  it('not should be able to update an three acts structure on project of another user', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        structure: 'three-acts',
        userId: new UniqueEntityId('user-2'),
      },
      new UniqueEntityId('project-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to update an three acts structure on project if user not exists', async () => {
    const project = makeProject(
      {
        structure: 'three-acts',
        userId: new UniqueEntityId('inexistent-user'),
      },
      new UniqueEntityId('project-1')
    );

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'inexistent-user',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });

  it('not should be able to update an three acts structure on project if project not exists', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));

    await usersInMemoryRepository.create(user);

    const result = await sut.execute({
      projectId: 'inexistent-project',
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });

  it('not should be able to update an three acts structure on project if structure type of project not is "three-acts"', async () => {
    const user = makeUser({}, new UniqueEntityId('user-1'));
    const project = makeProject(
      {
        structure: 'snowflake',
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('project-1')
    );

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'user-1',
      act1: 'Test',
      act2: 'over',
      act3: 'update',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UnexpectedError);
  });
});
