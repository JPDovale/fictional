import { Person } from '@modules/Persons/models/Person'
import { WatchedList } from '@shared/core/entities/WatchedList'

export class ProjectBookList extends WatchedList<Person> {
  compareItems(a: Person, b: Person): boolean {
    return a.equals(b)
  }
}
