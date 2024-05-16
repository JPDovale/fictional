import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure'

export abstract class SnowflakeStructuresRepository {
  abstract create(snowflakeStructure: SnowflakeStructure): Promise<void>

  abstract findById(id: string): Promise<SnowflakeStructure | null>

  abstract save(snowflakeStructure: SnowflakeStructure): Promise<void>
}
