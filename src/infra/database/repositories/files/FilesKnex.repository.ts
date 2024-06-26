import { KnexConfig, KnexConnection } from '@infra/database'
import { File } from '@modules/files/entites/File'
import { FilesRepository } from '@modules/files/repositories/Files.repository'
import { injectable } from 'tsyringe'
import { FilesKnexMapper } from './FilesKnex.mapper'

@injectable()
export class FilesKnexRepository implements FilesRepository<KnexConfig> {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: FilesKnexMapper,
  ) { }

  async create(data: File, ctx?: KnexConfig): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('files').insert(this.mapper.toPersistence(data))
  }

  async findById(id: string, ctx?: KnexConfig): Promise<File | null> {
    const { db } = ctx ?? this.knexConnection

    const file = await db('files').where({ id }).first()

    if (!file) {
      return null
    }

    return this.mapper.toDomain(file)
  }

  findAll(ctx?: KnexConfig): Promise<File[]> {
    throw new Error('Method not implemented.')
  }

  async save(data: File, ctx?: KnexConfig): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('files').update(this.mapper.toPersistence(data)).where({ id: data.id.toString() })
  }

  delete(id: string, ctx?: KnexConfig): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
