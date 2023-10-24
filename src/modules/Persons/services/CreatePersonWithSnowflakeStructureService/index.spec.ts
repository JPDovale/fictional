import 'reflect-metadata';
import { makeUser } from '@tests/users/factories/makeUser';
import { UsersInMemoryRepository } from '@tests/users/repositories/UsersInMemoryRepository';
import { ProjectsInMemoryRepository } from '@tests/projects/repositories/ProjectsInMemoryRepository';
import { PersonsInMemoryRepository } from '@tests/persons/repositories/PersonsInMemoryRepository';
import { makeProject } from '@tests/projects/factories/makeProject';
import { ThreeActsStructureInMemoryRepository } from '@tests/threeActsStructures/repositories/ThreeActsStructureInMemoryRepository';
import { BooksInMemoryRepository } from '@tests/books/repositories/BooksInMemoryRepository';
import { SnowflakeStructuresInMemoryRepository } from '@tests/snowflakeStructures/repositories/SnowflakeStructuresInMemoryRepository';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { ProjectBookList } from '@modules/Projects/models/ProjectBookList';
import { makeBook } from '@tests/books/factories/makeBook';
import { makeSnowflakeStructure } from '@tests/snowflakeStructures/factories/makeSnowflakeStructure';
import { CreatePersonWithSnowflakeStructureService } from '.';

let usersInMemoryRepository: UsersInMemoryRepository;
let threeActsStructureInMemoryRepository: ThreeActsStructureInMemoryRepository;
let snowflakeStructuresInMemoryRepository: SnowflakeStructuresInMemoryRepository;
let booksInMemoryRepository: BooksInMemoryRepository;
let projectsInMemoryRepository: ProjectsInMemoryRepository;
let personsInMemoryRepository: PersonsInMemoryRepository;

let sut: CreatePersonWithSnowflakeStructureService;

describe('Create person with snowflake structure', () => {
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

    sut = new CreatePersonWithSnowflakeStructureService(
      usersInMemoryRepository,
      projectsInMemoryRepository,
      booksInMemoryRepository,
      snowflakeStructuresInMemoryRepository
    );
  });

  it('should be able to create an new person on project with snowflake structure', async () => {
    const user = makeUser();
    const project = makeProject({
      userId: user.id,
      features: Features.createFromObject({
        person: true,
        structure: true,
      }),
      structure: 'snowflake',
      books: new ProjectBookList(),
    });
    const book = makeBook({
      projectId: project.id,
      userId: user.id,
      structure: 'snowflake',
    });
    const snowflakeStructure = makeSnowflakeStructure({});

    book.snowflakeStructure = snowflakeStructure;
    project.books.add(book);

    await usersInMemoryRepository.create(user);
    await projectsInMemoryRepository.create(project);

    const result = await sut.execute({
      name: 'Person',
      lastName: 'test',
      projectId: project.id.toString(),
      userId: user.id.toString(),
      bookId: book.id.toString(),
    });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(personsInMemoryRepository.persons[0].id).toEqual(
        result.value.person.id.toString()
      );
      expect(personsInMemoryRepository.persons[0].user_id).toEqual(
        user.id.toString()
      );
      expect(personsInMemoryRepository.persons[0]).toHaveProperty(
        'snowflake_structure_base_function'
      );
    }
  });
});
