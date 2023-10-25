import { Project } from '@modules/Projects/models/Project';
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

  async create(project: Project): Promise<void> {
    await db('projects').insert(ProjectsKnexMapper.toKnex(project));

    if (project.books) {
      const booksToAdd = project.books.getNewItems();
      await this.booksRepository.createMany(booksToAdd);
    }
  }

  async findManyByUserId(userId: string): Promise<Project[]> {
    const projects = await db('projects').where({ user_id: userId });

    return projects.map(ProjectsKnexMapper.toEntity);
  }

  async findById(id: string): Promise<Project | null> {
    const project = await db('projects').where({ id }).first();

    if (!project) return null;

    return ProjectsKnexMapper.toEntity(project);
  }
}
