import { Project } from '@modules/Projects/models/Project';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsKnexMapper } from './ProjectsKnexMapper';
import { ProjectsRepository } from '../contracts/ProjectsRepository';

@injectable()
export class ProjectsKnexRepository implements ProjectsRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.BooksRepository)
    private readonly booksRepository: BooksRepository
  ) {}

  async create(project: Project): Promise<Either<{}, {}>> {
    try {
      await db('projects').insert(ProjectsKnexMapper.toKnex(project));

      if (project.books) {
        const booksToAdd = project.books.getNewItems();
        await this.booksRepository.createMany(booksToAdd);
      }

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findManyByUserId(userId: string): Promise<Either<{}, Project[]>> {
    try {
      const projects = await db('projects').where({ user_id: userId });

      return right(projects.map(ProjectsKnexMapper.toEntity));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Project | null>> {
    try {
      const project = await db('projects').where({ id }).first();

      if (!project) return right(null);

      return right(ProjectsKnexMapper.toEntity(project));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
