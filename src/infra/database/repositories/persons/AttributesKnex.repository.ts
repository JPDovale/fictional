import { KnexConfig, KnexConnection } from '@infra/database'
import { AttributesRepository } from '@modules/persons/repositories/Attributes.repository'
import { injectable } from 'tsyringe'
import { Attribute } from '@modules/persons/entities/Attribute'
import { AttributePreview } from '@modules/persons/valuesObjects/AttributePreview'
import { AttributeMutationsRepository } from '@modules/persons/repositories/AttributeMutations.repository'
import { AttributesKnexMapper } from './AttributesKnex.mapper'

@injectable()
export class AttributesKnexRepository
  implements AttributesRepository<KnexConfig>
{
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: AttributesKnexMapper,
    private readonly attributeMutationsRepository: AttributeMutationsRepository,
  ) {}

  async create(data: Attribute, ctx?: KnexConfig): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('persons_attributes').insert(this.mapper.toPersistence(data))
  }

  async findById(id: string, ctx?: KnexConfig): Promise<Attribute | null> {
    const { db } = ctx ?? this.knexConnection

    const attribute = await db('persons_attributes').where('id', id).first()

    if (!attribute) return null

    const mutations =
      await this.attributeMutationsRepository.findManyByAttributeId(id, ctx)

    return this.mapper.toDomain({ ...attribute, mutations })
  }

  findAll(ctx?: KnexConfig): Promise<Attribute[]> {
    throw new Error('Method not implemented.')
  }

  async save(data: Attribute, ctx?: KnexConfig): Promise<void> {
    const { db } = ctx ?? this.knexConnection

    await db('persons_attributes')
      .update(this.mapper.toPersistence(data))
      .where('id', data.id.toString())

    const newAttributeMutations = data.mutations.getNewItems()

    if (newAttributeMutations.length !== 0) {
      await this.attributeMutationsRepository.createMany(
        newAttributeMutations,
        ctx,
      )
    }
  }

  delete(id: string, ctx?: KnexConfig): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyPreviewByProjectId(
    projectId: string,
    ctx?: KnexConfig,
  ): Promise<AttributePreview[]> {
    const { db } = ctx ?? this.knexConnection

    const attributes = await db('projects')
      .where({
        'projects.id': projectId,
        'persons.trashed_at': null,
        'persons_attributes.trashed_at': null,
      })
      .select(
        'persons.id as person_id',
        'persons_attributes.type as attribute_type',
        'persons_attributes.id as attribute_id',
        'files.id as file_id',
        'files.title as file_title',
        'files.content as file_content',
        'files.created_at as file_created_at',
        'files.updated_at as file_updated_at',
      )
      .join('persons', 'projects.id', '=', 'persons.project_id')
      .join(
        'person_attribute_to_person',
        'persons.id',
        '=',
        'person_attribute_to_person.person_id',
      )
      .join(
        'persons_attributes',
        'persons_attributes.id',
        '=',
        'person_attribute_to_person.attribute_id',
      )
      .join('files', 'persons_attributes.file_id', 'files.id')

    return attributes.map(this.mapper.toDomainPreview)
  }
}
