import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure'

export abstract class ThreeActsStructuresRepository {
  abstract create(threeActsStructure: ThreeActsStructure): Promise<void>

  abstract save(threeActsStructure: ThreeActsStructure): Promise<void>

  abstract findById(id: string): Promise<ThreeActsStructure | null>
}
