import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';

export enum EventToPersonType {
  BIRTH = 'BIRTH',
  DEATH = 'DEATH',
}

interface EventToPersonProps {
  type: EventToPersonType;
  eventId: UniqueId;
  personId: UniqueId;
  createdAt: Date;
  updatedAt: Date | null;
  trashedAt: Date | null;
}

export class EventToPerson extends AggregateRoot<EventToPersonProps> {
  static create(
    props: Optional<
      EventToPersonProps,
      'trashedAt' | 'updatedAt' | 'createdAt'
    >,
    id?: UniqueId
  ) {
    const eventToPersonProps: EventToPersonProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      trashedAt: props.trashedAt ?? null,
    };

    const eventToPerson = new EventToPerson(eventToPersonProps, id);

    return eventToPerson;
  }

  get type() {
    return this.props.type;
  }

  get eventId() {
    return this.props.eventId;
  }

  get personId() {
    return this.props.personId;
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
