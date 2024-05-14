import { Attribute } from '@modules/persons/entities/Attribute'
import { AttributeType } from '@modules/persons/entities/types'
import { AttributePreview } from '@modules/persons/valuesObjects/AttributePreview'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface AttributeFile {
  id: string
  file_id: string
  type: AttributeType
  created_at: Date
  updated_at: Date | null
}

interface AttributePreviewSelect {
  person_id: string
  attribute_type: AttributeType
  attribute_id: string
  file_id: string
  file_title: string
  file_created_at: Date
  file_updated_at: Date | null
}

@injectable()
export class AttributesKnexMapper extends RepositoryMapper<
  Attribute,
  AttributeFile
> {
  toDomain(raw: AttributeFile): Attribute {
    return Attribute.create(
      {
        fileId: UniqueId.create(raw.file_id),
        type: raw.type,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: Attribute): AttributeFile {
    return {
      id: entity.id.toString(),
      file_id: entity.fileId.toString(),
      type: entity.type,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    }
  }

  toDomainPreview(raw: AttributePreviewSelect): AttributePreview {
    return AttributePreview.create({
      fileId: UniqueId.create(raw.file_id),
      attributeType: raw.attribute_type,
      fileCreatedAt: raw.file_created_at,
      fileUpdatedAt: raw.file_updated_at,
      fileTitle: raw.file_title,
      personId: UniqueId.create(raw.person_id),
      attributeId: UniqueId.create(raw.attribute_id),
    })
  }
}
