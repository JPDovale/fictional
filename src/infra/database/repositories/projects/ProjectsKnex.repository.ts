import { injectable } from 'tsyringe'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { KnexConnection } from '../..'
import { ProjectsKnexMapper } from './ProjectsKnex.mapper'

@injectable()
export class ProjectsKnexRepository implements ProjectsRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: ProjectsKnexMapper,
  ) { }

  async create(data: User): Promise<void> {
    await this.knexConnection
      .db('users')
      .insert(this.mapper.toPersistence(data))
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
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
}
