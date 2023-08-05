import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { Either } from '@shared/core/error/Either';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { SnowflakeStructureFile } from '../types';

export abstract class SnowflakeStructuresRepository {
  abstract create(
    snowflakeStructure: SnowflakeStructure
  ): Promise<Either<{}, {}>>;

  abstract findById(id: string): Promise<Either<{}, SnowflakeStructure | null>>;

  abstract save(
    snowflakeStructure: SnowflakeStructure
  ): Promise<Either<{}, {}>>;

  static parserToFile(
    snowflakeStructure: SnowflakeStructure
  ): SnowflakeStructureFile {
    const snowflakeStructureFile: SnowflakeStructureFile = {
      central_idia: snowflakeStructure.centralIdia ?? null,
      created_at: snowflakeStructure.createdAt,
      expansion_to_page_paragraph_1:
        snowflakeStructure.expansionToPage.paragraph1,
      expansion_to_page_paragraph_2:
        snowflakeStructure.expansionToPage.paragraph2,
      expansion_to_page_paragraph_3:
        snowflakeStructure.expansionToPage.paragraph3,
      expansion_to_page_paragraph_4:
        snowflakeStructure.expansionToPage.paragraph4,
      expansion_to_page_paragraph_5:
        snowflakeStructure.expansionToPage.paragraph5,
      expansion_to_paragraph_phrase_1:
        snowflakeStructure.expansionToParagraph.phrase1,
      expansion_to_paragraph_phrase_2:
        snowflakeStructure.expansionToParagraph.phrase2,
      expansion_to_paragraph_phrase_3:
        snowflakeStructure.expansionToParagraph.phrase3,
      expansion_to_paragraph_phrase_4:
        snowflakeStructure.expansionToParagraph.phrase4,
      expansion_to_paragraph_phrase_5:
        snowflakeStructure.expansionToParagraph.phrase5,
      id: snowflakeStructure.id.toString(),
      implementor_id: snowflakeStructure.implementorId.toString(),
      interweaving_persons_and_expansion:
        snowflakeStructure.interweavingPersonsAndExpansion,
      updated_at: snowflakeStructure.updatedAt,
    };

    return snowflakeStructureFile;
  }

  static parser(
    snowflakeStructureReceived: SnowflakeStructureFile
  ): SnowflakeStructure {
    const snowflakeStructure = SnowflakeStructure.create(
      {
        implementorId: new UniqueEntityId(
          snowflakeStructureReceived.implementor_id
        ),
        centralIdia: snowflakeStructureReceived.central_idia,
        expansionToParagraph: {
          phrase1: snowflakeStructureReceived.expansion_to_paragraph_phrase_1,
          phrase2: snowflakeStructureReceived.expansion_to_paragraph_phrase_2,
          phrase3: snowflakeStructureReceived.expansion_to_paragraph_phrase_3,
          phrase4: snowflakeStructureReceived.expansion_to_paragraph_phrase_4,
          phrase5: snowflakeStructureReceived.expansion_to_paragraph_phrase_5,
        },
        expansionToPage: {
          paragraph1: snowflakeStructureReceived.expansion_to_page_paragraph_1,
          paragraph2: snowflakeStructureReceived.expansion_to_page_paragraph_2,
          paragraph3: snowflakeStructureReceived.expansion_to_page_paragraph_3,
          paragraph4: snowflakeStructureReceived.expansion_to_page_paragraph_4,
          paragraph5: snowflakeStructureReceived.expansion_to_page_paragraph_5,
        },
        updatedAt: snowflakeStructureReceived.updated_at,
        createdAt: snowflakeStructureReceived.created_at,
        interweavingPersonsAndExpansion:
          snowflakeStructureReceived.interweaving_persons_and_expansion,
      },
      new UniqueEntityId(snowflakeStructureReceived.id)
    );

    return snowflakeStructure;
  }
}
