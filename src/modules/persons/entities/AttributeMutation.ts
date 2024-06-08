import { EventDate } from '@modules/timelines/valueObjects/EventDate';
import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';

interface AttributeMutationProps {
  attributeId: UniqueId;
  fileId: UniqueId;
  eventId: UniqueId | null;
  position: number;
  date: EventDate | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export class AttributeMutation extends AggregateRoot<AttributeMutationProps> {
  static create(
    props: Optional<
      AttributeMutationProps,
      'createdAt' | 'updatedAt' | 'eventId' | 'date'
    >,
    id?: UniqueId
  ) {
    const attributeProps: AttributeMutationProps = {
      ...props,
      date: props.date ?? null,
      eventId: props.eventId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    };

    const attribute = new AttributeMutation(attributeProps, id);

    return attribute;
  }

  get fileId() {
    return this.props.fileId;
  }

  get attributeId() {
    return this.props.attributeId;
  }

  get eventId(): UniqueId | null {
    return this.props.eventId;
  }

  set eventId(eventId: UniqueId | null | undefined) {
    if (eventId === undefined) return;
    if (eventId?.equals(this.eventId)) return;

    this.props.eventId = eventId;

    if (!this.isNewEntity) {
      this.touch();
    }
  }

  get position() {
    return this.props.position;
  }

  get date() {
    return this.props.date;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}
