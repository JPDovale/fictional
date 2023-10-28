import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';
import { BornDate } from './valueObjects/BornDate';
import { DeathDate } from './valueObjects/DeathDate';
import { PersonSnowflakeStructureBase } from './valueObjects/PersonSnowflakeStructureBase';

export interface PersonProps {
  name: string | null;
  lastName: string | null;
  biographic: string | null;
  imageUrl: string | null;
  imageFilename: string | null;
  age: number | null;
  history: string | null;
  bornDate: BornDate | null;
  deathDate: DeathDate | null;

  createdAt: Date;
  updatedAt: Date;

  // Snowflake
  snowflakeStructureBase: PersonSnowflakeStructureBase | null;

  userId: UniqueEntityId;
  projectId: UniqueEntityId;
  bookId: UniqueEntityId | null;
}

export class Person extends AggregateRoot<PersonProps> {
  static create(
    props: Optional<
      PersonProps,
      | 'age'
      | 'bornDate'
      | 'createdAt'
      | 'deathDate'
      | 'history'
      | 'imageFilename'
      | 'imageUrl'
      | 'updatedAt'
      | 'name'
      | 'lastName'
      | 'snowflakeStructureBase'
      | 'biographic'
      | 'bookId'
    >,
    id?: UniqueEntityId
  ) {
    const personProps: PersonProps = {
      name: props.name ?? null,
      lastName: props.lastName ?? null,
      biographic: props.biographic ?? null,
      imageUrl: props.imageUrl ?? null,
      age: props.age ?? null,
      bornDate: props.bornDate ?? null,
      createdAt: props.createdAt ?? new Date(),
      deathDate: props.deathDate ?? null,
      history: props.history ?? null,
      imageFilename: props.imageFilename ?? null,
      updatedAt: props.updatedAt ?? new Date(),
      userId: props.userId,
      projectId: props.projectId,
      snowflakeStructureBase: props.snowflakeStructureBase ?? null,
      bookId: props.bookId ?? null,
    };

    const person = new Person(personProps, id);

    return person;
  }

  get name() {
    return this.props.name;
  }

  get lastName() {
    return this.props.lastName;
  }

  get biographic() {
    return this.props.biographic;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get age() {
    return this.props.age;
  }

  get bornDate() {
    return this.props.bornDate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get deathDate() {
    return this.props.deathDate;
  }

  get history() {
    return this.props.history;
  }

  set history(history) {
    this.props.history = history;
  }

  get imageFilename() {
    return this.props.imageFilename;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get userId() {
    return this.props.userId;
  }

  get projectId() {
    return this.props.projectId;
  }

  get snowflakeStructureBase() {
    return this.props.snowflakeStructureBase;
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}
