import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { EventDate } from '../valueObjects/EventDate';

interface EventProps {
  date: EventDate;
  event: string;
  timelineId: UniqueId;
  createdAt: Date;
  updatedAt: Date | null;
  trashedAt: Date | null;
}

export class Event extends AggregateRoot<EventProps> {
  static create(
    props: Optional<EventProps, 'createdAt' | 'updatedAt' | 'trashedAt'>,
    id?: UniqueId
  ) {
    const eventProps: EventProps = {
      ...props,
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
}
