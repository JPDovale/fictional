import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
import { db } from '@database/index';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { SnowflakeStructuresKnexMapper } from './SnowflakeStructuresKnexMapper';
import { SnowflakeStructuresRepository } from '../contracts/SnowflakeStructuresRepository';

@injectable()
export class SnowflakeStructuresKnexRepository
  implements SnowflakeStructuresRepository
{
  constructor(
    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository
  ) {}

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

    if (snowflakeStructure.persons) {
      const personsToAdd = snowflakeStructure.persons.getNewItems();

      await Promise.all([this.personsRepository.createMany(personsToAdd)]);
    }
  }
}
