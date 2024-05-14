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

  get name() {
    return this.props.name
  }

  get image() {
    return this.props.image
  }

  get type() {
    return this.props.type
  }

  get birthDate() {
    return this.props.birthDate
  }

  get deathDate() {
    return this.props.deathDate
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

  touch() {
    this.props.updatedAt = new Date()
  }
}
