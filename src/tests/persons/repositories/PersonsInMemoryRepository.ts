import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { Person } from '@modules/Persons/models/Person';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Either, left, right } from '@shared/core/error/Either';

export class PersonsInMemoryRepository implements PersonsRepository {
  private personsList: Person[] = [];

  get persons() {
    return this.personsList;
  }

  async create(person: Person): Promise<Either<{}, {}>> {
    try {
      this.personsList.push(person);
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(projectId: string): Promise<Either<{}, Person[]>> {
    try {
      const persons = this.persons.filter((person) =>
        person.projectId.equals(new UniqueEntityId(projectId))
      );
      return right(persons);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Person | null>> {
    try {
      const person =
        this.persons.find((p) => p.id.equals(new UniqueEntityId(id))) ?? null;
      return right(person);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByUserId(userId: string): Promise<Either<{}, Person[]>> {
    try {
      const persons = this.persons.filter((person) =>
        person.userId.equals(new UniqueEntityId(userId))
      );
      return right(persons);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(person: Person): Promise<Either<{}, {}>> {
    try {
      const indexOfPersons = this.persons.findIndex((p) =>
        p.id.equals(person.id)
      );
      this.personsList[indexOfPersons] = person;

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}
