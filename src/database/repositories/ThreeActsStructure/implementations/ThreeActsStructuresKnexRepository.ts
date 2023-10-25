import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { db } from '@database/index';
import { ThreeActsStructuresRepository } from '../contracts/ThreeActsStructuresRepository';
import { ThreeActsStructuresKnexMapper } from './ThreeActsStructuresKnexMapper';

export class ThreeActsStructuresKnexRepository
  implements ThreeActsStructuresRepository
{
  async create(threeActsStructure: ThreeActsStructure): Promise<void> {
    await db('three_acts_structures').insert(
      ThreeActsStructuresKnexMapper.toKnex(threeActsStructure)
    );
  }

  async save(threeActsStructure: ThreeActsStructure): Promise<void> {
    await db('three_acts_structures')
      .where({ id: threeActsStructure.id.toString() })
      .update(ThreeActsStructuresKnexMapper.toKnex(threeActsStructure));
  }

  async findById(id: string): Promise<ThreeActsStructure | null> {
    const threeActsStructure = await db('three_acts_structures')
      .where({ id })
      .first();

    if (!threeActsStructure) return null;

    return ThreeActsStructuresKnexMapper.toEntity(threeActsStructure);
  }
}
