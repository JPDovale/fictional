import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { PersonType } from './types';
import { PersonCreatedWithTimelineEvent } from '../events/PersonCreatedWithTimelineEvent.event';
import { EventToPersonType } from '@modules/timelines/entities/EventToPerson';

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
  PersonProps & {
    birthDate: string;
    deathDate: string;
  },
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'image'
  | 'affiliationId'
  | 'birthDate'
  | 'deathDate'
  | 'history'
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

    const isNewPerson = !id;

    if (isNewPerson && (props.birthDate || props.deathDate)) {
      const events: { date: string; event: string; type: EventToPersonType }[] =
        [];

      if (props.birthDate) {
        events.push({
          date: props.birthDate,
          event: `Nascimento de ${person.name}`,
          type: EventToPersonType.BIRTH,
        });
      }

      if (props.deathDate) {
        events.push({
          date: props.deathDate,
          event: `Morte de ${person.name}`,
          type: EventToPersonType.DEATH,
        });
      }

      person.addDomainEvent(new PersonCreatedWithTimelineEvent(person, events));
    }

    return person;
  }

  get name(): string | null {
    return this.props.name;
  }

  set name(name: string | undefined | null) {
    this.props.name = name === undefined ? this.props.name : name;
    this.touch();
  }

  get history(): string | null {
    return this.props.history;
  }

  set history(history: string | undefined | null) {
    this.props.history = history === undefined ? this.props.history : history;
    this.touch();
  }

  get image(): string | null {
    return this.props.image;
  }

  set image(image: string | undefined | null) {
    this.props.image = image === undefined ? this.props.image : image;
    this.touch();
  }

  get type(): PersonType {
    return this.props.type;
  }

  set type(type: PersonType | undefined) {
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
    this.props.affiliationId =
      affiliationId === undefined ? this.props.affiliationId : affiliationId;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}
