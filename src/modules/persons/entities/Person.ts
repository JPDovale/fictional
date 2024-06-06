import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { PersonType } from './types';
import { PersonCreatedWithTimelineEvent } from '../events/PersonCreatedWithTimelineEvent.event';
import { EventToPersonType } from '@modules/timelines/entities/EventToPerson';
import { DomainEvent } from '@shared/core/events/DomainEvent';
import { PersonInfosUsedInEventUpdatedEvent } from '../events/PersonInfosUsedInEventsUpdated.event';

interface PersonProps {
  name: string | null;
  image: string | null;
  history: string | null;
  type: PersonType;
  createdAt: Date;
  updatedAt: Date | null;
  projectId: UniqueId;
  affiliationId: UniqueId | null;
}

type CreatePersonProps = Optional<
  PersonProps,
  'createdAt' | 'updatedAt' | 'name' | 'image' | 'affiliationId' | 'history'
>;

export class Person extends AggregateRoot<PersonProps> {
  static create(props: CreatePersonProps, id?: UniqueId) {
    const personProps: PersonProps = {
      ...props,
      name: props.name ?? null,
      image: props.image ?? null,
      affiliationId: props.affiliationId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      history: props.history ?? null,
    };

    const person = new Person(personProps, id);

    return person;
  }

  get name(): string | null {
    return this.props.name;
  }

  set name(name: string | undefined | null) {
    if (name === this.props.name) return;

    this.props.name = name === undefined ? this.props.name : name;
    this.touch();
  }

  get history(): string | null {
    return this.props.history;
  }

  set history(history: string | undefined | null) {
    if (history === this.props.history) return;

    this.props.history = history === undefined ? this.props.history : history;
    this.touch();
  }

  get image(): string | null {
    return this.props.image;
  }

  set image(image: string | undefined | null) {
    if (image === this.props.image) return;

    this.props.image = image === undefined ? this.props.image : image;
    this.touch();
  }

  get type(): PersonType {
    return this.props.type;
  }

  set type(type: PersonType | undefined) {
    if (type === this.props.type) return;

    this.props.type = type === undefined ? this.props.type : type;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get projectId() {
    return this.props.projectId;
  }

  get affiliationId() {
    return this.props.affiliationId;
  }

  set affiliationId(affiliationId: UniqueId | undefined | null) {
    if (affiliationId?.equals(this.props?.affiliationId)) return;

    this.props.affiliationId =
      affiliationId === undefined ? this.props.affiliationId : affiliationId;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  addPersonCreatedWithTimelineEvent(
    events: { date: string; event: string; type: EventToPersonType }[]
  ) {
    this.addDomainEvent(new PersonCreatedWithTimelineEvent(this, events));
  }

  addPersonInfosUsedInEventsUpdatedEvent() {
    this.addDomainEvent(new PersonInfosUsedInEventUpdatedEvent(this));
  }
}
