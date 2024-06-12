import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { ValueObject } from '@shared/core/entities/ValueObject';
import { PersonType } from '../entities/types';
import { Event } from '@modules/timelines/entities/Event';

interface PersonWithDetailsProps {
  personId: UniqueId;
  fatherId: UniqueId | null;
  motherId: UniqueId | null;
  birthEvent: Event | null;
  deathEvent: Event | null;
  name: string | null;
  image: string | null;
  history: string | null;
  type: PersonType;
  createdAt: Date;
  updatedAt: Date | null;
  trashedAt: Date | null;
  projectId: UniqueId;
}

export class PersonWithDetails extends ValueObject<PersonWithDetailsProps> {
  static create(props: PersonWithDetailsProps) {
    const personWithParentsProps: PersonWithDetailsProps = {
      ...props,
    };

    const personWithParents = new PersonWithDetails(personWithParentsProps);

    return personWithParents;
  }

  get personId() {
    return this.props.personId;
  }

  get name() {
    return this.props.name;
  }

  get history() {
    return this.props.history;
  }

  get image() {
    return this.props.image;
  }

  get type() {
    return this.props.type;
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

  get projectId() {
    return this.props.projectId;
  }

  get fatherId() {
    return this.props.fatherId;
  }

  get motherId() {
    return this.props.motherId;
  }

  get birthEvent() {
    return this.props.birthEvent;
  }

  get deathEvent() {
    return this.props.deathEvent;
  }
}
