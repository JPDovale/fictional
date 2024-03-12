import { Foundation } from '@modules/foundations/entities/Foundation'
import { FoundationsRepository } from '@modules/foundations/repositories/Foundations.repository'
import { injectable } from 'tsyringe'
import { KnexConnection } from '@infra/database'
import { FoundationsKnexMapper } from './FoundationsKnex.mapper'

@injectable()
export class FoundationsKnexRepository implements FoundationsRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: FoundationsKnexMapper,
  ) { }

  async create(foundation: Foundation): Promise<void> {
    await this.knexConnection
      .db('foundations')
      .insert(this.mapper.toPersistence(foundation))
  }

  async findById(id: string): Promise<Foundation | null> {
    const foundation = await this.knexConnection
      .db('foundations')
      .where({ id })
      .first()

    if (!foundation) return null

    return this.mapper.toDomain(foundation)
  }

  findAll(): Promise<Foundation[]> {
    throw new Error('Method not implemented.')
  }

  async save(foundation: Foundation): Promise<void> {
    await this.knexConnection
      .db('foundations')
      .update(this.mapper.toPersistence(foundation))
      .where({ id: foundation.id.toString() })
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByProjectId(projectId: string): Promise<Foundation | null> {
    const foundation = await this.knexConnection
      .db('foundations')
      .where({
        project_id: projectId,
      })
      .first()

    if (!foundation) return null

    return this.mapper.toDomain(foundation)
  }
}
