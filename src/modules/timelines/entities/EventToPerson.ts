import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';

export enum EventToPersonType {
  BIRTH = 'BIRTH',
  DEATH = 'DEATH',
}

interface EventToPersonProps {
  type: EventToPersonType;
  eventId: UniqueId;
  personId: UniqueId;
}

export class EventToPerson extends AggregateRoot<EventToPersonProps> {
  static create(props: EventToPersonProps, id?: UniqueId) {
    const eventToPersonProps: EventToPersonProps = {
      ...props,
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
}
