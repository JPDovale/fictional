import { Book } from '@modules/Books/models/Book';
import { WatchedList } from '@shared/core/entities/WatchedList';

export class ProjectBookList extends WatchedList<Book> {
  compareItems(a: Book, b: Book): boolean {
    return a.id.equals(b.id);
  }
}
