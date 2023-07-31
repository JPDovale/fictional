import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Either, left, right } from '@shared/core/error/Either';

export class ThreeActsStructureInMemoryRepository
  implements ThreeActsStructuresRepository
{
  private threeActsStructuresList: ThreeActsStructure[] = [];

  get threeActsStructures() {
    return this.threeActsStructuresList;
  }

  async create(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>> {
    try {
      this.threeActsStructuresList.push(threeActsStructure);
      return right({});
    } catch (err) {
      return left({});
    }
  }

  async save(threeActsStructure: ThreeActsStructure): Promise<Either<{}, {}>> {
    try {
      const threeActsStructureIndex = this.threeActsStructuresList.findIndex(
        (threeStructure) => threeStructure.id.equals(threeActsStructure.id)
      );

      this.threeActsStructuresList[threeActsStructureIndex] =
        threeActsStructure;
      return right({});
    } catch (err) {
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      const threeActsStructure = this.threeActsStructuresList.find(
        (TAStructure) => TAStructure.id.equals(new UniqueEntityId(id))
      );
      return right(threeActsStructure ?? null);
    } catch (err) {
      return left({});
    }
  }

  async findByProjectId(
    projectId: string
  ): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      const threeActsStructure = this.threeActsStructuresList.find(
        (TAStructure) =>
          TAStructure.implementorId.equals(new UniqueEntityId(projectId))
      );

      return right(threeActsStructure ?? null);
    } catch (err) {
      return left({});
    }
  }
}
