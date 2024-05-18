import { KnexConfig, KnexConnection } from '@infra/database'
import { File } from '@modules/files/entites/File'
import { injectable } from 'tsyringe'
import { AttributesToPersonsRepository } from '@modules/persons/repositories/AttributesToPersons.repository'
import { AttributeToPerson } from '@modules/persons/entities/AttributeToPerson'
import { AttributesToPersonsKnexMapper } from './AttributesToPersonsKnex.mapper'

@injectable()
export class AttributesToPersonsKnexRepository
  implements AttributesToPersonsRepository<KnexConfig> {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: AttributesToPersonsKnexMapper,
  ) { }

  async create(data: AttributeToPerson, ctx?: KnexConfig): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('person_attribute_to_person').insert(
      this.mapper.toPersistence(data),
    )
  }

  findById(id: string, ctx?: KnexConfig): Promise<File | null> {
    throw new Error('Method not implemented.')
  }

  findAll(ctx?: KnexConfig): Promise<File[]> {
    throw new Error('Method not implemented.')
  }

  save(data: File, ctx?: KnexConfig): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string, ctx?: KnexConfig): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
