import { Foundation } from '@modules/foundations/entities/Foundation'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface FoundationFile {
  id: string
  foundation: string
  where_happens: string
  why_happens: string
  who_happens: string
  what_happens: string
  created_at: Date
  updated_at: Date | null
  project_id: string
}

@injectable()
export class FoundationsKnexMapper
  implements RepositoryMapper<Foundation, FoundationFile> {
  toDomain(raw: FoundationFile): Foundation {
    return Foundation.create(
      {
        foundation: raw.foundation,
        whereHappens: raw.where_happens,
        whyHappens: raw.why_happens,
        whoHappens: raw.who_happens,
        whatHappens: raw.what_happens,
        projectId: UniqueId.create(raw.project_id),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: Foundation): FoundationFile {
    return {
      id: entity.id.toString(),
      foundation: entity.foundation,
      where_happens: entity.whereHappens,
      why_happens: entity.whyHappens,
      who_happens: entity.whoHappens,
      what_happens: entity.whatHappens,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      project_id: entity.projectId.toString(),
    }
  }
}
