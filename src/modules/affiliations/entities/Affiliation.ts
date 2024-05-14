import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { Optional } from '@shared/core/types/Optional'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'

interface AffiliationProps {
  fatherId: UniqueId | null
  motherId: UniqueId | null
  createdAt: Date
  updatedAt: Date | null
}

export class Affiliation extends AggregateRoot<AffiliationProps> {
  static create(
    props: Optional<AffiliationProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId,
  ) {
    if (!props.fatherId && !props.motherId) {
      throw new Error('mother or father id is required')
    }

    const affiliationProps: AffiliationProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const affiliation = new Affiliation(affiliationProps, id)

    return affiliation
  }

  get fatherId() {
    return this.props.fatherId
  }

  get motherId() {
    return this.props.motherId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}
