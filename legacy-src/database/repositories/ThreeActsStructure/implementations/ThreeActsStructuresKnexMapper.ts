import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { ThreeActsStructureFile } from '../types'

export class ThreeActsStructuresKnexMapper {
  static toEntity(raw: ThreeActsStructureFile): ThreeActsStructure {
    return ThreeActsStructure.create(
      {
        act1: raw.act_1,
        act2: raw.act_2,
        act3: raw.act_3,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toKnex(
    threeActsStructure: ThreeActsStructure,
  ): ThreeActsStructureFile {
    return {
      act_1: threeActsStructure.act1 ?? null,
      act_2: threeActsStructure.act2 ?? null,
      act_3: threeActsStructure.act3 ?? null,
      created_at: threeActsStructure.createdAt,
      updated_at: threeActsStructure.updatedAt,
      id: threeActsStructure.id.toString(),
    }
  }
}
