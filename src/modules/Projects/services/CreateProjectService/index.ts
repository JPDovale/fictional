import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Book } from '@modules/Books/models/Book';
import {
  Project,
  ProjectStructureType,
  ProjectType,
} from '@modules/Projects/models/Project';
import {
  Features,
  ObjectFeatures,
} from '@modules/Projects/models/Project/valueObjects/Features';
import { UserInProject } from '@modules/Projects/models/Project/valueObjects/UserInProject';
import { ProjectBookList } from '@modules/Projects/models/ProjectBookList';
import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { Optional } from '@shared/core/types/Optional';
import { ResourceNotCreated } from '@shared/errors/ResourceNotCreated';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface BookRequest {
  title: string;
  imageUrl?: string | null;
}

interface Request {
  userId: string;
  name: string;
  imageUrl?: string | null;
  features: Optional<
    ObjectFeatures,
    | 'multi-book'
    | 'city'
    | 'family'
    | 'inst'
    | 'language'
    | 'nation'
    | 'person'
    | 'planet'
    | 'power'
    | 'race'
    | 'religion'
    | 'structure'
    | 'time-lines'
  >;
  password?: string;
  type?: ProjectType;
  structure?: ProjectStructureType;
  books: BookRequest[];
}

type Response = Either<
  ResourceNotCreated | UserNotFount | UnexpectedError,
  { project: Project }
>;

@injectable()
export class CreateProjectService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository
  ) {}

  async execute({
    userId,
    name,
    imageUrl,
    features,
    password,
    type,
    structure,
    books: booksReceived,
  }: Request): Promise<Response> {
    const findUserResponse = await this.usersRepository.findById(userId);
    if (!findUserResponse.value || findUserResponse.isLeft())
      return left(new UserNotFount());

    const user = findUserResponse.value;

    const project = Project.create({
      name,
      imageUrl:
        imageUrl && process.platform === 'linux'
          ? `file://${imageUrl}`
          : imageUrl,
      features: Features.createFromObject(features),
      userId: user.id,
      password,
      type,
      creator: UserInProject.createCreator(user),
      structure,
    });

    if (project.type === 'book') {
      const books: Book[] = [];

      if (
        project.features.featureIsApplied('multi-book') &&
        booksReceived.length >= 2 &&
        booksReceived.length <= 20
      ) {
        booksReceived.forEach((book) => {
          const newBook = Book.create({
            title: book.title,
            imageUrl:
              book.imageUrl && process.platform === 'linux'
                ? `file://${book.imageUrl}`
                : book.imageUrl,
            projectId: project.id,
            userId: user.id,
            structure,
          });

          if (newBook.structure === 'three-acts') {
            const threeActsForBook = ThreeActsStructure.create({
              implementorId: newBook.id,
            });

            newBook.threeActsStructure = threeActsForBook;
          }

          if (newBook.structure === 'snowflake') {
            project.features.enable('person');

            const snowflakeForBook = SnowflakeStructure.create({
              implementorId: newBook.id,
            });

            newBook.snowflakeStructure = snowflakeForBook;
          }

          books.push(newBook);
        });
      } else {
        const newBook = Book.create({
          projectId: project.id,
          title: booksReceived[0]?.title ?? project.name,
          userId: user.id,
          imageUrl: booksReceived[0]?.imageUrl ?? project.imageUrl,
          structure,
        });

        if (newBook.structure === 'three-acts') {
          const threeActsForBook = ThreeActsStructure.create({
            implementorId: newBook.id,
          });

          newBook.threeActsStructure = threeActsForBook;
        }

        if (newBook.structure === 'snowflake') {
          const snowflakeForBook = SnowflakeStructure.create({
            implementorId: newBook.id,
          });

          newBook.snowflakeStructure = snowflakeForBook;
        }

        books.push(newBook);
      }

      project.books = new ProjectBookList();
      books.forEach((book) => {
        project.books.add(book);
      });

      const response = await this.projectsRepository.create(project);

      if (response.isLeft()) {
        return left(new ResourceNotCreated());
      }

      return right({
        project,
      });
    }

    return left(new UnexpectedError());
  }
}
