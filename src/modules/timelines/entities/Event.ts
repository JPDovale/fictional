import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { EventDate } from '../valueObjects/EventDate';
import { PersonType } from '@modules/persons/entities/types';
import { EventToPersonType } from './EventToPerson';

export type ImportanceLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface EventProps {
  date: EventDate;
  event: string;
  importanceLevel: ImportanceLevel;
  timelineId: UniqueId;
  createdAt: Date;
  updatedAt: Date | null;
  trashedAt: Date | null;
}

export class Event extends AggregateRoot<EventProps> {
  static create(
    props: Optional<
      EventProps,
      'createdAt' | 'updatedAt' | 'trashedAt' | 'importanceLevel'
    >,
    id?: UniqueId
  ) {
    const eventProps: EventProps = {
      ...props,
      importanceLevel: props?.importanceLevel ?? 1,
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? null,
      trashedAt: props?.trashedAt ?? null,
    };

    const event = new Event(eventProps, id);

    return event;
  }

  get date() {
    return this.props.date;
  }

  set date(eventDate: EventDate) {
    if (eventDate.equals(this.date)) return;
    this.props.date = eventDate;
    this.touch();
  }

  get event() {
    return this.props.event;
  }

  set event(event: string) {
    if (event === this.props.event) return;
    this.props.event = event;
    this.touch();
  }

  get timelineId() {
    return this.props.timelineId;
  }

  get importanceLevel() {
    return this.props.importanceLevel;
  }

  set importanceLevel(importanceLevel: ImportanceLevel) {
    this.props.importanceLevel = importanceLevel;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get trashedAt() {
    return this.props.trashedAt;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  moveToTrash() {
    this.props.trashedAt = new Date();
  }

  static getImportanceLevelForPersonEvent(
    personType: PersonType,
    eventType: EventToPersonType
  ): ImportanceLevel {
    const importanceLevelMapper = {
      [EventToPersonType.DEATH]: {
        [PersonType.PROTAGONIST]: 10,
        [PersonType.ANTAGONIST]: 9,
        [PersonType.MENTOR]: 9,
        [PersonType.SUPPORTING]: 7,
        [PersonType.COMIC]: 7,
        [PersonType.SYMBOLIC]: 6,
        [PersonType.SECONDARY]: 5,
        [PersonType.ADVERSARY]: 5,
        [PersonType.EXTRA]: 3,
      },
      [EventToPersonType.BIRTH]: {
        [PersonType.PROTAGONIST]: 10,
        [PersonType.ANTAGONIST]: 10,
        [PersonType.MENTOR]: 6,
        [PersonType.SUPPORTING]: 5,
        [PersonType.COMIC]: 5,
        [PersonType.SYMBOLIC]: 4,
        [PersonType.SECONDARY]: 3,
        [PersonType.ADVERSARY]: 3,
        [PersonType.EXTRA]: 2,
      },
    };

    return importanceLevelMapper[eventType][personType] as ImportanceLevel;
  }
}
