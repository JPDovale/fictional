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
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { makeSnowflakeStructure } from '@tests/snowflakeStructures/factories/makeSnowflakeStructure';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { UpdateSnowflakeStructureService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;

let sut: UpdateSnowflakeStructureService;

describe('Update snowflake structure', () => {
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

    sut = new UpdateSnowflakeStructureService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
      booksInMemoryRepository,
      snowflakeStructuresInMemoryRepository
    );
  });

  it('should be able to update an snowflake structure central idia', async () => {
    const user = makeUser();
    const project = makeProject({
      type: 'book',
      structure: 'snowflake',
      features: Features.createFromObject({
        structure: true,
      }),
      books: new ProjectBookList(),
      userId: user.id,
    });
    const book = makeBook({
      userId: user.id,
      projectId: project.id,
    });
    const snowflakeStructure = makeSnowflakeStructure({
      implementorId: book.id,
      centralIdia: 'Initial Central idia',
      expansionToParagraph: {
        phrase1: 'phrase 1',
        phrase2: 'phrase 2',
        phrase3: 'phrase 3',
        phrase4: 'phrase 4',
        phrase5: 'phrase 5',
      },
    });

    book.snowflakeStructure = snowflakeStructure;
    project.books.add(book);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
      centralIdia: 'An new central idia',
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .central_idia
      ).toEqual('An new central idia');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_1
      ).toEqual('phrase 1');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_2
      ).toEqual('phrase 2');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_3
      ).toEqual('phrase 3');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_4
      ).toEqual('phrase 4');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_5
      ).toEqual('phrase 5');
    }
  });

  it('should be able to update an snowflake structure expansion to paragraph', async () => {
    const user = makeUser();
    const project = makeProject({
      type: 'book',
      structure: 'snowflake',
      features: Features.createFromObject({
        structure: true,
      }),
      books: new ProjectBookList(),
      userId: user.id,
    });
    const book = makeBook({
      userId: user.id,
      projectId: project.id,
    });
    const snowflakeStructure = makeSnowflakeStructure({
      implementorId: book.id,
      centralIdia: 'Initial Central idia',
    });

    book.snowflakeStructure = snowflakeStructure;
    project.books.add(book);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
      phrase1: 'An',
      phrase2: 'expansion',
      phrase3: 'to',
      phrase4: 'paragraph',
      phrase5: null,
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .central_idia
      ).toEqual('Initial Central idia');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_1
      ).toEqual('An');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_2
      ).toEqual('expansion');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_3
      ).toEqual('to');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_4
      ).toEqual('paragraph');
      expect(
        snowflakeStructuresInMemoryRepository.snowflakeStructures[0]
          .expansion_to_paragraph_phrase_5
      ).toEqual('');
    }
  });

  it('should be able to update an snowflake structure in project with "multi-books" feature', async () => {
    const user = makeUser();
    const project = makeProject({
      type: 'book',
      structure: 'snowflake',
      features: Features.createFromObject({
        structure: true,
        'multi-book': true,
      }),
      books: new ProjectBookList(),
      userId: user.id,
    });

    const idOfTest = new UniqueEntityId();

    for (let i = 0; i < 10; i++) {
      const book = makeBook(
        {
          userId: user.id,
          projectId: project.id,
        },
        i === 5 ? idOfTest : undefined
      );
      const snowflakeStructure = makeSnowflakeStructure({
        implementorId: book.id,
        centralIdia: 'Initial Central idia',
      });

      book.snowflakeStructure = snowflakeStructure;
      project.books.add(book);
    }

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
      centralIdia: 'An new central idia',
      bookId: idOfTest.toString(),
    });

    expect(result.isRight()).toEqual(true);

    const snowflakeStructureUpdated =
      snowflakeStructuresInMemoryRepository.snowflakeStructures.find(
        (SFS) => SFS.implementor_id === idOfTest.toString()
      );

    if (result.isRight()) {
      expect(snowflakeStructureUpdated?.central_idia).toEqual(
        'An new central idia'
      );
    }
  });

  it('not should be able to update an snowflake structure on project of another user', async () => {
    const user = makeUser();
    const user2 = makeUser();
    const project = makeProject({
      structure: 'three-acts',
      userId: user2.id,
    });
    const book = makeBook({
      userId: user2.id,
      projectId: project.id,
    });
    const snowflakeStructure = makeSnowflakeStructure({
      implementorId: book.id,
      centralIdia: 'Initial Central idia',
    });

    book.snowflakeStructure = snowflakeStructure;
    project.books.add(book);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
      centralIdia: 'An new central idia',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(PermissionDenied);
  });

  it('not should be able to update an snowflake structure on project if user not exists', async () => {
    const project = makeProject({
      structure: 'three-acts',
      userId: new UniqueEntityId('inexistent-user'),
    });
    const book = makeBook({
      userId: new UniqueEntityId('inexistent-user'),
      projectId: project.id,
    });
    const snowflakeStructure = makeSnowflakeStructure({
      implementorId: book.id,
      centralIdia: 'Initial Central idia',
    });

    book.snowflakeStructure = snowflakeStructure;
    project.books.add(book);

    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: 'project-1',
      userId: 'inexistent-user',
      centralIdia: 'An new central idia',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UserNotFount);
  });

  it('not should be able to update an snowflake structure on project if project not exists', async () => {
    const user = makeUser();
    const book = makeBook({
      userId: user.id,
      projectId: new UniqueEntityId('inexistent-project'),
    });
    const snowflakeStructure = makeSnowflakeStructure({
      implementorId: book.id,
      centralIdia: 'Initial Central idia',
    });

    book.snowflakeStructure = snowflakeStructure;

    await usersInMemoryRepository.create(user);
    await booksInMemoryRepository.create(book);

    const result = await sut.execute({
      projectId: 'inexistent-project',
      userId: user.id.toString(),
      centralIdia: 'An new central idia',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFount);
  });

  it('not should be able to update an snowflake structure on project if structure type of project not is "snowflake"', async () => {
    const user = makeUser();
    const project = makeProject({
      type: 'book',
      structure: 'three-acts',
      features: Features.createFromObject({
        structure: true,
      }),
      books: new ProjectBookList(),
      userId: user.id,
    });
    const book = makeBook({
      userId: user.id,
      projectId: project.id,
    });
    const snowflakeStructure = makeSnowflakeStructure({
      implementorId: book.id,
      centralIdia: 'Initial Central idia',
    });

    book.snowflakeStructure = snowflakeStructure;
    project.books.add(book);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      projectId: project.id.toString(),
      userId: user.id.toString(),
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(UnexpectedError);
  });
});
