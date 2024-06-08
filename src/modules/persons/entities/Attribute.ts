import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { AttributeType } from './types';
import { AttributeMutationList } from './AttributeMutationList';

interface AttributeProps {
  fileId: UniqueId;
  mutations: AttributeMutationList;
  createdAt: Date;
  updatedAt: Date | null;
  type: AttributeType;
}

export class Attribute extends AggregateRoot<AttributeProps> {
  static create(
    props: Optional<AttributeProps, 'createdAt' | 'updatedAt' | 'mutations'>,
    id?: UniqueId
  ) {
    const attributeProps: AttributeProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      mutations: props.mutations ?? new AttributeMutationList(),
    };

    const attribute = new Attribute(attributeProps, id);

    return attribute;
  }

  get fileId() {
    return this.props.fileId;
  }

  get type() {
    return this.props.type;
  }

  get mutations() {
    return this.props.mutations;
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
