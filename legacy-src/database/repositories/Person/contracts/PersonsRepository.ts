import { Person } from '@modules/Persons/models/Person'

export abstract class PersonsRepository {
  abstract create(person: Person): Promise<void>

  abstract createMany(persons: Person[]): Promise<void>

  abstract findByProjectId(projectId: string): Promise<Person[]>

  abstract findByUserId(userId: string): Promise<Person[]>

  abstract findByBookId(bookId: string): Promise<Person[]>

  abstract findById(id: string): Promise<Person | null>

  abstract save(person: Person): Promise<void>
}
