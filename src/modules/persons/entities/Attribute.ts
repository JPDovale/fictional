import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { Optional } from '@shared/core/types/Optional'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { AttributeType } from './types'

interface AttributeProps {
  fileId: UniqueId
  createdAt: Date
  updatedAt: Date | null
  type: AttributeType
}

export class Attribute extends AggregateRoot<AttributeProps> {
  static create(
    props: Optional<AttributeProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId,
  ) {
    const attributeProps: AttributeProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const attribute = new Attribute(attributeProps, id)

    return attribute
  }

  get fileId() {
    return this.props.fileId
  }

  get type() {
    return this.props.type
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
