import { Person } from '@modules/Persons/models/Person';
import { db } from '@database/index';
import { PersonsRepository } from '../contracts/PersonsRepository';
import { PersonsKnexMapper } from './PersonsKnexMapper';

export class PersonsKnexRepository implements PersonsRepository {
  async create(person: Person): Promise<void> {
    await db('persons').insert(PersonsKnexMapper.toKnex(person));
  }

  async createMany(persons: Person[]): Promise<void> {
    await Promise.all(
      persons.map((person) =>
        db('persons').insert(PersonsKnexMapper.toKnex(person))
      )
    );
  }

  async findByProjectId(projectId: string): Promise<Person[]> {
    const persons = await db('persons').where({ project_id: projectId });

    return persons.map(PersonsKnexMapper.toEntity);
  }

  async findByUserId(userId: string): Promise<Person[]> {
    const persons = await db('persons').where({ user_id: userId });

    return persons.map(PersonsKnexMapper.toEntity);
  }

  // snowflakeStructureId: string
  findBySnowflakeStructureId(): Promise<Person[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Person | null> {
    const person = await db('persons').where({ id }).first();

    if (!person) return null;

    return PersonsKnexMapper.toEntity(person);
  }

  async save(person: Person): Promise<void> {
    await db('persons')
      .where({ id: person.id.toString() })
      .update(PersonsKnexMapper.toKnex(person));
  }
}
