import { ValueObject } from '@shared/core/entities/ValueObject'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { AttributeType } from '../entities/types'

interface AttributePreviewProps {
  fileId: UniqueId
  fileTitle: string
  fileContentPreview: string
  fileCreatedAt: Date
  fileUpdatedAt: Date | null
  attributeType: AttributeType
  attributeId: UniqueId
  personId: UniqueId
}

export class AttributePreview extends ValueObject<AttributePreviewProps> {
  static create(props: AttributePreviewProps) {
    return new AttributePreview(props)
  }

  get fileId() {
    return this.props.fileId
  }

  get fileTitle() {
    return this.props.fileTitle
  }

  get fileContentPreview() {
    return this.props.fileContentPreview
  }

  get fileCreatedAt() {
    return this.props.fileCreatedAt
  }

  get fileUpdatedAt() {
    return this.props.fileUpdatedAt
  }

  get attributeType() {
    return this.props.attributeType
  }

  get attributeId() {
    return this.props.attributeId
  }

  get personId() {
    return this.props.personId
  }
}
