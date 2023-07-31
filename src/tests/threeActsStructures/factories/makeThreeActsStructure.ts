import { fakerPT_BR } from '@faker-js/faker';
import {
  ThreeActsStructure,
  ThreeActsStructureProps,
} from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';

export function makeThreeActsStructure(
  override: Partial<ThreeActsStructureProps>,
  id?: UniqueEntityId
) {
  const threeActsStructure = ThreeActsStructure.create(
    {
      implementorId: new UniqueEntityId(),
      act1: fakerPT_BR.lorem.paragraphs(4),
      act2: fakerPT_BR.lorem.paragraphs(4),
      act3: fakerPT_BR.lorem.paragraphs(4),
      ...override,
    },
    id
  );

  return threeActsStructure;
}
