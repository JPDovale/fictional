import { fakerPT_BR } from '@faker-js/faker'
import {
  SnowflakeStructure,
  SnowflakeStructureProps,
} from '@modules/SnowflakeStructures/models/SnowflakeStructure'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export function makeSnowflakeStructure(
  override: Partial<SnowflakeStructureProps>,
  id?: UniqueEntityId,
) {
  const threeActsStructure = SnowflakeStructure.create(
    {
      centralIdia: fakerPT_BR.lorem.words(8),
      expansionToParagraph: {
        phrase1: fakerPT_BR.lorem.words(8),
        phrase2: fakerPT_BR.lorem.words(8),
        phrase3: fakerPT_BR.lorem.words(8),
        phrase4: fakerPT_BR.lorem.words(8),
        phrase5: fakerPT_BR.lorem.words(8),
      },
      expansionToPage: {
        paragraph1: fakerPT_BR.lorem.paragraphs(4),
        paragraph2: fakerPT_BR.lorem.paragraphs(4),
        paragraph3: fakerPT_BR.lorem.paragraphs(4),
        paragraph4: fakerPT_BR.lorem.paragraphs(4),
        paragraph5: fakerPT_BR.lorem.paragraphs(4),
      },
      interweavingPersonsAndExpansion: fakerPT_BR.lorem.text(),
      ...override,
    },
    id,
  )

  return threeActsStructure
}
