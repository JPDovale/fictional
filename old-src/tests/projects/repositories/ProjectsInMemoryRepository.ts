import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { ProjectFile } from '@database/repositories/Project/types';
import { Project } from '@modules/Projects/models/Project';
import { Either, left, right } from '@shared/core/error/Either';

export class ProjectsInMemoryRepository implements ProjectsRepository {
  constructor(private readonly booksRepository: BooksRepository) {}

  private projectsList: ProjectFile[] = [];

  get projects() {
    return this.projectsList;
  }

  async create(project: Project): Promise<Either<{}, {}>> {
    try {
      this.projectsList.push(ProjectsRepository.parserToFile(project));

      const newBooks = project.books.getNewItems();
      const inserts: Array<Promise<Either<{}, {}>>> = [];

      newBooks.forEach((book) => {
        inserts.push(this.booksRepository.create(book));
      });

      await Promise.all(inserts);

      return right({});
    } catch (err) {
      return left({});
    }
  }

  async findManyByUserId(userId: string): Promise<Either<{}, Project[]>> {
    try {
      const projects = this.projects.filter(
        (project) => project.user_id === userId
      );
      return right(
        projects.map((project) => ProjectsRepository.parser(project))
      );
    } catch (err) {
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Project | null>> {
    try {
      const project = this.projects.find((proj) => proj.id === id);
      return right(project ? ProjectsRepository.parser(project) : null);
    } catch (err) {
      return left({});
    }
  }
}
