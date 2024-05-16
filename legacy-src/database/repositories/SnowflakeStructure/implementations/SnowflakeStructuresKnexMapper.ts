import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { SnowflakeStructureFile } from '../types'

export class SnowflakeStructuresKnexMapper {
  static toEntity(raw: SnowflakeStructureFile): SnowflakeStructure {
    return SnowflakeStructure.create(
      {
        centralIdia: raw.central_idia,
        createdAt: raw.created_at,
        expansionToParagraph: {
          phrase1: raw.expansion_to_paragraph_phrase_1,
          phrase2: raw.expansion_to_paragraph_phrase_2,
          phrase3: raw.expansion_to_paragraph_phrase_3,
          phrase4: raw.expansion_to_paragraph_phrase_4,
          phrase5: raw.expansion_to_paragraph_phrase_5,
        },
        expansionToPage: {
          paragraph1: raw.expansion_to_page_paragraph_1,
          paragraph2: raw.expansion_to_page_paragraph_2,
          paragraph3: raw.expansion_to_page_paragraph_3,
          paragraph4: raw.expansion_to_page_paragraph_4,
          paragraph5: raw.expansion_to_page_paragraph_5,
        },
        interweavingPersonsAndExpansion: raw.interweaving_persons_and_expansion,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toKnex(
    snowflakeStructure: SnowflakeStructure,
  ): SnowflakeStructureFile {
    return {
      central_idia: snowflakeStructure.centralIdia ?? null,
      created_at: snowflakeStructure.createdAt,
      expansion_to_page_paragraph_1:
        snowflakeStructure.expansionToPage.paragraph1 ?? null,
      expansion_to_page_paragraph_2:
        snowflakeStructure.expansionToPage.paragraph2 ?? null,
      expansion_to_page_paragraph_3:
        snowflakeStructure.expansionToPage.paragraph3 ?? null,
      expansion_to_page_paragraph_4:
        snowflakeStructure.expansionToPage.paragraph4 ?? null,
      expansion_to_page_paragraph_5:
        snowflakeStructure.expansionToPage.paragraph5 ?? null,
      expansion_to_paragraph_phrase_1:
        snowflakeStructure.expansionToParagraph.phrase1 ?? null,
      expansion_to_paragraph_phrase_2:
        snowflakeStructure.expansionToParagraph.phrase2 ?? null,
      expansion_to_paragraph_phrase_3:
        snowflakeStructure.expansionToParagraph.phrase3 ?? null,
      expansion_to_paragraph_phrase_4:
        snowflakeStructure.expansionToParagraph.phrase4 ?? null,
      expansion_to_paragraph_phrase_5:
        snowflakeStructure.expansionToParagraph.phrase5 ?? null,
      id: snowflakeStructure.id.toString(),
      interweaving_persons_and_expansion:
        snowflakeStructure.interweavingPersonsAndExpansion,
      updated_at: snowflakeStructure.updatedAt,
    }
  }
}
