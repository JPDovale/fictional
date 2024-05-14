import { injectable } from 'tsyringe'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { Project } from '@modules/projects/entities/Project'
import { DomainEvents } from '@shared/core/events/DomainEvents'
import { KnexConnection } from '../..'
import { ProjectsKnexMapper } from './ProjectsKnex.mapper'

@injectable()
export class ProjectsKnexRepository implements ProjectsRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: ProjectsKnexMapper,
  ) {}

  async create(project: Project): Promise<void> {
    await this.knexConnection
      .db('projects')
      .insert(this.mapper.toPersistence(project))

    DomainEvents.dispatchEventsForAggregate(project.id)
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.knexConnection
      .db('projects')
      .where({ id })
      .first()

    if (!project) return null

    return this.mapper.toDomain(project)
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  save(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByUserId(userId: string): Promise<Project[]> {
    const projects = await this.knexConnection
      .db('projects')
      .where({
        user_id: userId,
      })
      .orderBy('created_at', 'desc')

    return projects.map(this.mapper.toDomain)
  }
}
