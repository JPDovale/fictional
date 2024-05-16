import { Repository } from '@shared/core/contracts/Repository'
import { AttributeToPerson } from '../entities/AttributeToPerson'

export abstract class AttributesToPersonsRepository<
  T = unknown,
> extends Repository<AttributeToPerson, T> {}
