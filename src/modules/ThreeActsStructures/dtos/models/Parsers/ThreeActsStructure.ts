import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { ThreeActsStructureModelResponse } from '../types';

export function ThreeActsStructureParser(
  threeActsStructure: ThreeActsStructure
): ThreeActsStructureModelResponse {
  const threeActsStructurePartied: ThreeActsStructureModelResponse = {
    act1: threeActsStructure.act1 ?? null,
    act2: threeActsStructure.act2 ?? null,
    act3: threeActsStructure.act3 ?? null,
    id: threeActsStructure.id.toString(),
  };

  return threeActsStructurePartied;
}
