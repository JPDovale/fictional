import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export type BookStructureType = 'three-acts' | 'snowflake' | 'hero-journey';

export interface BookProps {
  title: string;
  subtitle: string | null;
  structure: BookStructureType;

  userId: UniqueEntityId;
  projectId: UniqueEntityId;

  threeActsStructure: ThreeActsStructure | null;
  threeActsStructureId: UniqueEntityId | null;

  imageUrl: string | null;
  imageFilename: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export class Book extends AggregateRoot<BookProps> {
  static create(
    props: Optional<
      BookProps,
      | 'createdAt'
      | 'imageFilename'
      | 'imageUrl'
      | 'structure'
      | 'subtitle'
      | 'threeActsStructure'
      | 'threeActsStructureId'
      | 'updatedAt'
    >,
    id?: UniqueEntityId
  ) {
    const propsBook: BookProps = {
      title: props.title,
      subtitle: props.subtitle ?? null,
      structure: props.structure ?? 'three-acts',
      userId: props.userId,
      projectId: props.projectId,
      threeActsStructureId: props.threeActsStructureId ?? null,
      threeActsStructure: props.threeActsStructure ?? null,
      imageFilename: props.imageFilename ?? null,
      imageUrl: props.imageUrl ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };

    const book = new Book(propsBook, id);

    return book;
  }

  get title() {
    return this.props.title;
  }

  get subtitle() {
    return this.props.subtitle;
  }

  get structure() {
    return this.props.structure;
  }

  get userId() {
    return this.props.userId;
  }

  get projectId() {
    return this.props.projectId;
  }

  get threeActsStructureId() {
    return this.props.threeActsStructureId;
  }

  get threeActsStructure() {
    return this.props.threeActsStructure;
  }

  set threeActsStructure(threeActsStructure) {
    this.props.threeActsStructure = threeActsStructure;
    this.props.threeActsStructureId = threeActsStructure
      ? threeActsStructure.id
      : null;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get imageFilename() {
    return this.props.imageFilename;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
