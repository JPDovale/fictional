import { ImportanceLevel } from '@modules/timelines/entities/Event';
import { EventDate } from '@modules/timelines/valueObjects/EventDate';
import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';

interface AttributeMutationProps {
  attributeId: UniqueId;
  title: string | null;
  importanceLevel: ImportanceLevel | null;
  fileId: UniqueId;
  eventId: UniqueId | null;
  position: number;
  date: EventDate | null;
  createdAt: Date;
  updatedAt: Date | null;
  trashedAt: Date | null;
}

export class AttributeMutation extends AggregateRoot<AttributeMutationProps> {
  static create(
    props: Optional<
      AttributeMutationProps,
      | 'createdAt'
      | 'updatedAt'
      | 'eventId'
      | 'date'
      | 'trashedAt'
      | 'title'
      | 'importanceLevel'
    >,
    id?: UniqueId
  ) {
    const attributeProps: AttributeMutationProps = {
      ...props,
      title: props.title ?? null,
      date: props.date ?? null,
      importanceLevel: props.importanceLevel ?? null,
      eventId: props.eventId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      trashedAt: props.trashedAt ?? null,
    };

    const attribute = new AttributeMutation(attributeProps, id);

    return attribute;
  }

  get fileId() {
    return this.props.fileId;
  }

  get title(): string | null {
    return this.props.title;
  }

  set title(title: string | null | undefined) {
    if (title === undefined) return;

    this.props.title = title;
    this.touch();
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

  set position(position: number) {
    this.props.position = position;
    this.touch();
  }

  get date() {
    return this.props.date;
  }

  get importanceLevel() {
    return this.props.importanceLevel;
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
    this.touch();
  }
}
