import { KnexConfig, KnexConnection } from '@infra/database'
import { injectable } from 'tsyringe'
import { AttributeMutationsRepository } from '@modules/persons/repositories/AttributeMutations.repository'
import { AttributeMutation } from '@modules/persons/entities/AttributeMutation'
import { AttributeMutationsKnexMapper } from './AttributeMutationsKnex.mapper'

@injectable()
export class AttributeMutationsKnexRepository
  implements AttributeMutationsRepository<KnexConfig>
{
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: AttributeMutationsKnexMapper,
  ) {}

  async createMany(
    data: AttributeMutation[],
    ctx?: KnexConfig | undefined,
  ): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('person_attribute_mutations').insert(
      data.map(this.mapper.toPersistence),
    )
  }

  async saveMany(
    data: AttributeMutation[],
    ctx?: KnexConfig | undefined,
  ): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    const updatesPromises = data.map((mutation) =>
      db('person_attribute_mutations')
        .update(this.mapper.toPersistence(mutation))
        .where('id', mutation.id.toString()),
    )

    await Promise.all(updatesPromises)
  }

  async findManyByAttributeId(
    attributeId: string,
    ctx?: KnexConfig | undefined,
  ): Promise<AttributeMutation[]> {
    const { db } = ctx ?? this.knexConnection

    const mutations = await db('person_attribute_mutations')
      .where({
        'person_attribute_mutations.attribute_id': attributeId,
        'person_attribute_mutations.trashed_at': null,
      })
      .leftJoin('time_line_events', function () {
        this.on(
          'person_attribute_mutations.event_id',
          '=',
          'time_line_events.id',
        )
          .andOnNotNull('person_attribute_mutations.event_id')
          .andOnNull('time_line_events.trashed_at')
      })
      .select(
        'person_attribute_mutations.*',
        'time_line_events.date',
        'time_line_events.importance_level',
      )
      .orderBy('person_attribute_mutations.position', 'asc')

    return mutations.map(this.mapper.toDomain)
  }

  create(data: AttributeMutation, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(
    id: string,
    ctx?: KnexConfig | undefined,
  ): Promise<AttributeMutation | null> {
    throw new Error('Method not implemented.')
  }

  findAll(ctx?: KnexConfig | undefined): Promise<AttributeMutation[]> {
    throw new Error('Method not implemented.')
  }

  async save(
    data: AttributeMutation,
    ctx?: KnexConfig | undefined,
  ): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('person_attribute_mutations')
      .update(this.mapper.toPersistence(data))
      .where('id', data.id.toString())
  }

  delete(id: string, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
