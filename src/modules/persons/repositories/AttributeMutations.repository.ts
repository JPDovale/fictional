import { Repository } from '@shared/core/contracts/Repository';
import { AttributeMutation } from '../entities/AttributeMutation';

export abstract class AttributeMutationsRepository<
  T = unknown
> extends Repository<AttributeMutation, T> {
  abstract createMany(data: AttributeMutation[], ctx?: T): Promise<void>;
  abstract findManyByAttributeId(
    attributeId: string,
    ctx?: T
  ): Promise<AttributeMutation[]>;
}
