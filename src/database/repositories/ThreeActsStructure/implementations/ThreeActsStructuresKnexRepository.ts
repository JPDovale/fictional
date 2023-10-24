import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { ThreeActsStructuresRepository } from '../contracts/ThreeActsStructuresRepository';
import { ThreeActsStructuresKnexMapper } from './ThreeActsStructuresKnexMapper';

export class ThreeActsStructuresKnexRepository
  implements ThreeActsStructuresRepository
{
  async create(
    threeActsStructure: ThreeActsStructure
  ): Promise<Either<{}, {}>> {
    try {
      await db('three_acts_structures').insert(
        ThreeActsStructuresKnexMapper.toKnex(threeActsStructure)
      );
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(threeActsStructure: ThreeActsStructure): Promise<Either<{}, {}>> {
    try {
      await db('three_acts_structures')
        .where({ id: threeActsStructure.id.toString() })
        .update(ThreeActsStructuresKnexMapper.toKnex(threeActsStructure));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, ThreeActsStructure | null>> {
    try {
      const threeActsStructure = await db('three_acts_structures')
        .where({ id })
        .first();

      if (!threeActsStructure) return right(null);
      return right(ThreeActsStructuresKnexMapper.toEntity(threeActsStructure));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
