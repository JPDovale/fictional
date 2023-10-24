import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { SnowflakeStructuresRepository } from '../contracts/SnowflakeStructuresRepository';
import { SnowflakeStructuresKnexMapper } from './SnowflakeStructuresKnexMapper';

export class SnowflakeStructuresKnexRepository
  implements SnowflakeStructuresRepository
{
  async create(
    snowflakeStructure: SnowflakeStructure
  ): Promise<Either<{}, {}>> {
    try {
      await db('snowflake_structures').insert(
        SnowflakeStructuresKnexMapper.toKnex(snowflakeStructure)
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, SnowflakeStructure | null>> {
    try {
      const snowflakeStructure = await db('snowflake_structures')
        .where({ id })
        .first();

      if (!snowflakeStructure) return right(null);

      return right(SnowflakeStructuresKnexMapper.toEntity(snowflakeStructure));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(snowflakeStructure: SnowflakeStructure): Promise<Either<{}, {}>> {
    try {
      await db('snowflake_structures')
        .where({ id: snowflakeStructure.id.toString() })
        .update(SnowflakeStructuresKnexMapper.toKnex(snowflakeStructure));

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
