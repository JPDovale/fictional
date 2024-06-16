import { Project } from '@modules/projects/entities/Project';
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository';
import { DomainEvents } from '@shared/core/events/DomainEvents';

export class ProjectsInMemoryRepository implements ProjectsRepository {
  async findManyByUserId(userId: string): Promise<Project[]> {
    const projects = this.projects.filter(
      (project) => project.userId.toString() === userId
    );
    return projects;
  }

  async create(data: Project, ctx?: unknown): Promise<void> {
    this.projects.push(data);
    DomainEvents.dispatchEventsForAggregate(data.id);
  }

  async findById(id: string, ctx?: unknown): Promise<Project | null> {
    const project = this.projects.find(
      (project) => project.id.toString() === id
    );
    if (!project) return null;
    return project;
  }

  findAll(ctx?: unknown): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }
  save(data: Project, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public projects: Project[] = [];
}
