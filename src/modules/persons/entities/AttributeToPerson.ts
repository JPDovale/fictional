import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'

interface AttributeToPersonProps {
  attributeId: UniqueId
  personId: UniqueId
}

export class AttributeToPerson extends AggregateRoot<AttributeToPersonProps> {
  static create(props: AttributeToPersonProps, id?: UniqueId) {
    const attributeToPersonProps: AttributeToPersonProps = {
      ...props,
    }

    const attribute = new AttributeToPerson(attributeToPersonProps, id)

    return attribute
  }

  get personId() {
    return this.props.personId
  }

  get attributeId() {
    return this.props.attributeId
  }
}
