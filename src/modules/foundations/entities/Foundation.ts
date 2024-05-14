import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { Optional } from '@tanstack/react-query'

interface FoundationProps {
  foundation: string
  whatHappens: string
  whyHappens: string
  whereHappens: string
  whoHappens: string
  createdAt: Date
  updatedAt: Date | null
  projectId: UniqueId
}

export class Foundation extends AggregateRoot<FoundationProps> {
  static create(
    props: Optional<
      FoundationProps,
      | 'createdAt'
      | 'updatedAt'
      | 'whyHappens'
      | 'whoHappens'
      | 'whatHappens'
      | 'whereHappens'
      | 'foundation'
    >,
    id?: UniqueId,
  ) {
    const foundationProps: FoundationProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      whatHappens: props.whatHappens ?? '',
      whyHappens: props.whyHappens ?? '',
      whereHappens: props.whereHappens ?? '',
      whoHappens: props.whoHappens ?? '',
      foundation: props.foundation ?? '',
    }

    const foundation = new Foundation(foundationProps, id)

    return foundation
  }

  get foundation(): string {
    return this.props.foundation
  }

  set foundation(foundation: string | undefined | null) {
    if (!foundation && foundation === undefined) {
      return
    }

    this.touch()

    if (foundation === null) {
      this.props.foundation = ''
      return
    }

    this.props.foundation = foundation
  }

  get whatHappens(): string {
    return this.props.whatHappens
  }

  set whatHappens(whatHappens: string | undefined | null) {
    if (!whatHappens && whatHappens === undefined) {
      return
    }

    this.touch()

    if (whatHappens === null) {
      this.props.whatHappens = ''
      return
    }

    this.props.whatHappens = whatHappens
  }

  get whyHappens(): string {
    return this.props.whyHappens
  }

  set whyHappens(whyHappens: string | undefined | null) {
    if (!whyHappens && whyHappens === undefined) {
      return
    }

    this.touch()

    if (whyHappens === null) {
      this.props.whyHappens = ''
      return
    }

    this.props.whyHappens = whyHappens
  }

  get whereHappens(): string {
    return this.props.whereHappens
  }

  set whereHappens(whereHappens: string | undefined | null) {
    if (!whereHappens && whereHappens === undefined) {
      return
    }

    this.touch()

    if (whereHappens === null) {
      this.props.whereHappens = ''
      return
    }

    this.props.whereHappens = whereHappens
  }

  get whoHappens(): string {
    return this.props.whoHappens
  }

  set whoHappens(whoHappens: string | undefined | null) {
    if (!whoHappens && whoHappens === undefined) {
      return
    }

    this.touch()

    if (whoHappens === null) {
      this.props.whoHappens = ''
      return
    }

    this.props.whoHappens = whoHappens
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

  touch() {
    this.props.updatedAt = new Date()
  }
}
