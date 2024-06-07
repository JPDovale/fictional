import { DomainEvent } from '@shared/core/events/DomainEvent';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { Person } from '../entities/Person';

export class PersonBirthOrDeathDateUpdatedEvent implements DomainEvent {
  public ocurredAt: Date;
  private _person: Person;
  private _birthDate: string | null | undefined;
  private _deathDate: string | null | undefined;

  constructor(
    person: Person,
    birthDate: string | null | undefined,
    deathDate: string | null | undefined
  ) {
    this._person = person;
    this._birthDate = birthDate;
    this._deathDate = deathDate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueId {
    return this._person.id;
  }

  get person() {
    return this._person;
  }

  get birthDate() {
    return this._birthDate;
  }

  get deathDate() {
    return this._deathDate;
  }
}
