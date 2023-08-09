import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { PersonParser } from '@modules/Persons/dtos/models/Parsers/Person';
import { SnowflakeStructureModelResponse } from '../types';

export function SnowflakeStructureParser(
  snowflakeStructure: SnowflakeStructure
): SnowflakeStructureModelResponse {
  const snowflakeStructurePartied: SnowflakeStructureModelResponse = {
    centralIdia: snowflakeStructure.centralIdia ?? null,
    createdAt: snowflakeStructure.createdAt,
    expansionToPage: {
      paragraph1: snowflakeStructure.expansionToPage.paragraph1 ?? null,
      paragraph2: snowflakeStructure.expansionToPage.paragraph2 ?? null,
      paragraph3: snowflakeStructure.expansionToPage.paragraph3 ?? null,
      paragraph4: snowflakeStructure.expansionToPage.paragraph4 ?? null,
      paragraph5: snowflakeStructure.expansionToPage.paragraph5 ?? null,
    },
    expansionToParagraph: {
      phrase1: snowflakeStructure.expansionToParagraph?.phrase1 ?? null,
      phrase2: snowflakeStructure.expansionToParagraph?.phrase2 ?? null,
      phrase3: snowflakeStructure.expansionToParagraph?.phrase3 ?? null,
      phrase4: snowflakeStructure.expansionToParagraph?.phrase4 ?? null,
      phrase5: snowflakeStructure.expansionToParagraph?.phrase5 ?? null,
    },
    persons: snowflakeStructure.persons
      ? snowflakeStructure.persons.currentItems.map((person) =>
          PersonParser(person)
        )
      : [],
    id: snowflakeStructure.id.toString(),
    interweavingPersonsAndExpansion:
      snowflakeStructure.interweavingPersonsAndExpansion,
    updatedAt: snowflakeStructure.updatedAt,
  };

  return snowflakeStructurePartied;
}
