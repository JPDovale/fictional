import { DomainEvent } from '@shared/core/events/DomainEvent';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { Person } from '../entities/Person';

export class PersonInfosUsedInEventUpdatedEvent implements DomainEvent {
  public ocurredAt: Date;
  private _person: Person;

  constructor(person: Person) {
    this._person = person;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueId {
    return this._person.id;
  }

  get person() {
    return this._person;
  }
}
