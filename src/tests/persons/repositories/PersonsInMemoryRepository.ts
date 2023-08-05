import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { PersonFile } from '@database/repositories/Person/types';
import { Person } from '@modules/Persons/models/Person';
import { Either, left, right } from '@shared/core/error/Either';

export class PersonsInMemoryRepository implements PersonsRepository {
  private personsList: PersonFile[] = [];

  get persons() {
    return this.personsList;
  }

  async create(person: Person): Promise<Either<{}, {}>> {
    try {
      this.personsList.push(PersonsRepository.parserToFile(person));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(projectId: string): Promise<Either<{}, Person[]>> {
    try {
      const persons = this.persons.filter(
        (person) => person.project_id === projectId
      );
      return right(persons.map((person) => PersonsRepository.parser(person)));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Person | null>> {
    try {
      const person = this.persons.find((p) => p.id === id) ?? null;
      return right(person ? PersonsRepository.parser(person) : null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByUserId(userId: string): Promise<Either<{}, Person[]>> {
    try {
      const persons = this.persons.filter(
        (person) => person.user_id === userId
      );
      return right(persons.map((person) => PersonsRepository.parser(person)));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(person: Person): Promise<Either<{}, {}>> {
    try {
      const indexOfPersons = this.persons.findIndex(
        (p) => p.id === person.id.toString()
      );
      this.personsList[indexOfPersons] = PersonsRepository.parserToFile(person);
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
