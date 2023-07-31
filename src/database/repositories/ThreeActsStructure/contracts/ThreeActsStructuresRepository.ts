import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
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
