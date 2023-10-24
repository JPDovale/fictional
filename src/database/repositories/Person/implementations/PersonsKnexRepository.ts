import { Person } from '@modules/Persons/models/Person';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { PersonsRepository } from '../contracts/PersonsRepository';
import { PersonsKnexMapper } from './PersonsKnexMapper';

export class PersonsKnexRepository implements PersonsRepository {
  async create(person: Person): Promise<Either<{}, {}>> {
    try {
      await db('persons').insert(PersonsKnexMapper.toKnex(person));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createMany(persons: Person[]): Promise<Either<{}, {}>> {
    try {
      await Promise.all(
        persons.map((person) =>
          db('persons').insert(PersonsKnexMapper.toKnex(person))
        )
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(projectId: string): Promise<Either<{}, Person[]>> {
    try {
      const persons = await db('persons').where({ project_id: projectId });

      return right(persons.map(PersonsKnexMapper.toEntity));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByUserId(userId: string): Promise<Either<{}, Person[]>> {
    try {
      const persons = await db('persons').where({ user_id: userId });

      return right(persons.map(PersonsKnexMapper.toEntity));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  findBySnowflakeStructureId(): // snowflakeStructureId: string
  Promise<Either<{}, Person[]>> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Either<{}, Person | null>> {
    try {
      const person = await db('persons').where({ id }).first();

      if (!person) return right(null);

      return right(PersonsKnexMapper.toEntity(person));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(person: Person): Promise<Either<{}, {}>> {
    try {
      await db('persons')
        .where({ id: person.id.toString() })
        .update(PersonsKnexMapper.toKnex(person));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
