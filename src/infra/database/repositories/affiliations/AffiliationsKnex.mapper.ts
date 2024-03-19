import { Affiliation } from '@modules/affiliations/entities/Affiliation'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface AffiliationFile {
  id: string
  father_id: string | null
  mother_id: string | null
  created_at: Date
  updated_at: Date | null
}

@injectable()
export class AffiliationsKnexMapper extends RepositoryMapper<
  Affiliation,
  AffiliationFile
> {
  toDomain(raw: AffiliationFile): Affiliation {
    return Affiliation.create(
      {
        fatherId: raw.father_id ? UniqueId.create(raw.father_id) : null,
        motherId: raw.mother_id ? UniqueId.create(raw.mother_id) : null,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: Affiliation): AffiliationFile {
    if (!entity.motherId && !entity.fatherId) {
      throw new Error('motherId and fatherId are null')
    }

    return {
      id: entity.id.toString(),
      father_id: entity.fatherId?.toString() ?? null,
      mother_id: entity.motherId?.toString() ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    }
  }
}
