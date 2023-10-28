import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { db } from '@database/index';
import { SnowflakeStructuresRepository } from '../contracts/SnowflakeStructuresRepository';
import { SnowflakeStructuresKnexMapper } from './SnowflakeStructuresKnexMapper';

export class SnowflakeStructuresKnexRepository
  implements SnowflakeStructuresRepository
{
  async create(snowflakeStructure: SnowflakeStructure): Promise<void> {
    await db('snowflake_structures').insert(
      SnowflakeStructuresKnexMapper.toKnex(snowflakeStructure)
    );
  }

  async findById(id: string): Promise<SnowflakeStructure | null> {
    const snowflakeStructure = await db('snowflake_structures')
      .where({ id })
      .first();

    if (!snowflakeStructure) return null;

    return SnowflakeStructuresKnexMapper.toEntity(snowflakeStructure);
  }

  async save(snowflakeStructure: SnowflakeStructure): Promise<void> {
    snowflakeStructure.touch();

    await db('snowflake_structures')
      .where({ id: snowflakeStructure.id.toString() })
      .update(SnowflakeStructuresKnexMapper.toKnex(snowflakeStructure));
  }
}
