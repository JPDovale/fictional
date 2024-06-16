import { Repository } from '@shared/core/contracts/Repository';
import { Project } from '../entities/Project';

export abstract class ProjectsRepository<T = unknown> extends Repository<
  Project,
  T
> {
  abstract findManyByUserId(userId: string, ctx?: T): Promise<Project[]>;
}
