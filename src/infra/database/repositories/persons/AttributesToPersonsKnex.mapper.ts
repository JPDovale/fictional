import { AttributeToPerson } from '@modules/persons/entities/AttributeToPerson'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface AttributeToPersonFile {
  id: string
  person_id: string
  attribute_id: string
}

@injectable()
export class AttributesToPersonsKnexMapper extends RepositoryMapper<
  AttributeToPerson,
  AttributeToPersonFile
> {
  toDomain(raw: AttributeToPersonFile): AttributeToPerson {
    return AttributeToPerson.create(
      {
        personId: UniqueId.create(raw.person_id),
        attributeId: UniqueId.create(raw.attribute_id),
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: AttributeToPerson): AttributeToPersonFile {
    return {
      id: entity.id.toString(),
      person_id: entity.personId.toString(),
      attribute_id: entity.attributeId.toString(),
    }
  }
}
