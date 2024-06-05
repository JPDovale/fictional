import { WatchedList } from '@shared/core/entities/WatchedList';
import { Event } from './Event';

export class TimelineEventsList extends WatchedList<Event> {
  compareItems(a: Event, b: Event): boolean {
    return a.equals(b);
  }
}
