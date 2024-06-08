import { WatchedList } from '@shared/core/entities/WatchedList';
import { AttributeMutation } from './AttributeMutation';

export class AttributeMutationList extends WatchedList<AttributeMutation> {
  compareItems(a: AttributeMutation, b: AttributeMutation): boolean {
    return a.equals(b);
  }
}
