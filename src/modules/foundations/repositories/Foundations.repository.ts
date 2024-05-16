import { Repository } from '@shared/core/contracts/Repository'
import { Foundation } from '../entities/Foundation'

export abstract class FoundationsRepository extends Repository<Foundation> {
  abstract findByProjectId(projectId: string): Promise<Foundation | null>
}
