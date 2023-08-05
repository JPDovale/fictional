import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { ThreeActsStructureFile } from '@database/repositories/ThreeActsStructure/types';
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { Either, left, right } from '@shared/core/error/Either';

export class ThreeActsStructureInMemoryRepository
  implements ThreeActsStructuresRepository
{
  private threeActsStructuresList: ThreeActsStructureFile[] = [];

  get threeActsStructures() {
    return this.threeActsStructuresList;
  }

  async create(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>> {
    try {
      this.threeActsStructuresList.push(
        ThreeActsStructuresRepository.parserToFile(threeActsStructure)
      );
      return right({});
    } catch (err) {
      return left({});
    }
  }

  async save(threeActsStructure: ThreeActsStructure): Promise<Either<{}, {}>> {
    try {
      const threeActsStructureIndex = this.threeActsStructuresList.findIndex(
        (threeStructure) =>
          threeStructure.id === threeActsStructure.id.toString()
      );

      this.threeActsStructuresList[threeActsStructureIndex] =
        ThreeActsStructuresRepository.parserToFile(threeActsStructure);
      return right({});
    } catch (err) {
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      const threeActsStructure = this.threeActsStructuresList.find(
        (TAStructure) => TAStructure.id === id
      );
      return right(
        threeActsStructure
          ? ThreeActsStructuresRepository.parser(threeActsStructure)
          : null
      );
    } catch (err) {
      return left({});
    }
  }

  async findByProjectId(
    projectId: string
  ): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      const threeActsStructure = this.threeActsStructuresList.find(
        (TAStructure) => TAStructure.implementor_id === projectId
      );

      return right(
        threeActsStructure
          ? ThreeActsStructuresRepository.parser(threeActsStructure)
          : null
      );
    } catch (err) {
      return left({});
    }
  }
}
