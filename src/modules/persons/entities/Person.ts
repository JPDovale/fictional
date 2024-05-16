import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { Optional } from '@shared/core/types/Optional'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { PersonType } from './types'

interface PersonProps {
  name: string | null
  image: string | null
  type: PersonType
  birthDate: string | null
  deathDate: string | null
  createdAt: Date
  updatedAt: Date | null
  projectId: UniqueId
  affiliationId: UniqueId | null
}

export class Person extends AggregateRoot<PersonProps> {
  static create(
    props: Optional<
      PersonProps,
      | 'createdAt'
      | 'updatedAt'
      | 'name'
      | 'image'
      | 'affiliationId'
      | 'birthDate'
      | 'deathDate'
    >,
    id?: UniqueId,
  ) {
    const personProps: PersonProps = {
      ...props,
      birthDate: props.birthDate ?? null,
      deathDate: props.deathDate ?? null,
      name: props.name ?? null,
      image: props.image ?? null,
      affiliationId: props.affiliationId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const person = new Person(personProps, id)

    return person
  }

  get name(): string | null {
    return this.props.name
  }

  set name(name: string | undefined | null) {
    this.props.name = name === undefined ? this.props.name : name
    this.touch()
  }

  get image(): string | null {
    return this.props.image
  }

  set image(image: string | undefined | null) {
    this.props.image = image === undefined ? this.props.image : image
    this.touch()
  }

  get type(): PersonType {
    return this.props.type
  }

  set type(type: PersonType | undefined) {
    this.props.type = type === undefined ? this.props.type : type
    this.touch()
  }

  get birthDate(): string | null {
    return this.props.birthDate
  }

  set birthDate(birthDate: string | undefined | null) {
    this.props.birthDate =
      birthDate === undefined ? this.props.birthDate : birthDate
    this.touch()
  }

  get deathDate(): string | null {
    return this.props.deathDate
  }

  set deathDate(deathDate: string | undefined | null) {
    this.props.deathDate =
      deathDate === undefined ? this.props.deathDate : deathDate
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get projectId() {
    return this.props.projectId
  }

  get affiliationId() {
    return this.props.affiliationId
  }

  set affiliationId(affiliationId: UniqueId | undefined | null) {
    this.props.affiliationId =
      affiliationId === undefined ? this.props.affiliationId : affiliationId
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}
