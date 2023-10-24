import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { Either } from '@shared/core/error/Either';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { ThreeActsStructureFile } from '../types';

export abstract class ThreeActsStructuresRepository {
  abstract create(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>>;

  abstract save(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>>;

  abstract findById(id: string): Promise<Either<{}, ThreeActsStructure | null>>;

  static parserToFile(
    threeActsStructure: ThreeActsStructure
  ): ThreeActsStructureFile {
    const threeActsStructureFile: ThreeActsStructureFile = {
      id: threeActsStructure.id.toString(),
      act_1: threeActsStructure.act1 ?? null,
      act_2: threeActsStructure.act2 ?? null,
      act_3: threeActsStructure.act3 ?? null,
    };

    return threeActsStructureFile;
  }

  static parser(
    threeActsStructureReceived: ThreeActsStructureFile
  ): ThreeActsStructure {
    const threeActsStructure = ThreeActsStructure.create(
      {
        act1: threeActsStructureReceived.act_1 ?? undefined,
        act2: threeActsStructureReceived.act_2 ?? undefined,
        act3: threeActsStructureReceived.act_3 ?? undefined,
      },
      new UniqueEntityId(threeActsStructureReceived.id)
    );

    return threeActsStructure;
  }
}
