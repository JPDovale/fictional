import { PersonModelResponse } from '@modules/Persons/dtos/models/types'
import {
  ExpansionToPage,
  ExpansionToParagraph,
} from '@modules/SnowflakeStructures/models/SnowflakeStructure'

export abstract class SnowflakeStructureModelResponse {
  abstract id: string

  abstract createdAt: Date

  abstract updatedAt: Date

  abstract centralIdia: string | null

  abstract expansionToParagraph: ExpansionToParagraph | null

  abstract expansionToPage: ExpansionToPage | null

  abstract interweavingPersonsAndExpansion: string | null

  abstract persons: PersonModelResponse[]
}
