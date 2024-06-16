import { DomainEvent } from '@shared/core/events/DomainEvent';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { Person } from '../entities/Person';
import { EventToPersonType } from '@modules/timelines/entities/EventToPerson';

export class PersonCreatedWithTimelineEvent implements DomainEvent {
  public ocurredAt: Date;
  private _person: Person;
  private _eventsDate: {
    date: string;
    event: string;
    type: EventToPersonType;
  }[];

  constructor(
    person: Person,
    eventsDate: { date: string; event: string; type: EventToPersonType }[]
  ) {
    this._person = person;
    this._eventsDate = eventsDate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueId {
    return this._person.id;
  }

  get person() {
    return this._person;
  }

  get eventsDate() {
    return this._eventsDate;
  }
}
