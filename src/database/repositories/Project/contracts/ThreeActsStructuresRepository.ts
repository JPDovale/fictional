import { ThreeActsStructure } from '@modules/Projects/models/ThreeActsStructure';
import { Either } from '@shared/core/error/Either';

export abstract class ThreeActsStructuresRepository {
  abstract create(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>>;

  abstract save(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>>;

  abstract findById(id: string): Promise<Either<{}, ThreeActsStructure | null>>;
}
