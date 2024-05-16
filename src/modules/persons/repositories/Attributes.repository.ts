import { Repository } from '@shared/core/contracts/Repository'
import { Attribute } from '../entities/Attribute'
import { AttributePreview } from '../valuesObjects/AttributePreview'

export abstract class AttributesRepository<T = unknown> extends Repository<
  Attribute,
  T
> {
  abstract findManyPreviewByProjectId(
    projectId: string,
    ctx?: T,
  ): Promise<AttributePreview[]>
}
