import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { AttributeType } from '../entities/types'
import { AttributePreview } from '../valuesObjects/AttributePreview'

export interface AttributePreviewResponse {
  id: string
  type: AttributeType
  personId: string
  file: {
    id: string
    title: string
    createdAt: Date
    updatedAt: Date | null
  }
}

export interface AttributePreviewPresented {
  attribute: AttributePreviewResponse
}

export interface AttributesPreviewsPresented {
  attributes: AttributePreviewResponse[]
}

@injectable()
export class AttributePreviewPresenter
  implements
  Presenter<
    AttributePreview,
    AttributePreviewPresented,
    AttributesPreviewsPresented
  > {
  private parse(raw: AttributePreview): AttributePreviewResponse {
    return {
      id: raw.attributeId.toString(),
      type: raw.attributeType,
      personId: raw.personId.toString(),
      file: {
        id: raw.fileId.toString(),
        title: raw.fileTitle,
        createdAt: raw.fileCreatedAt,
        updatedAt: raw.fileUpdatedAt,
      },
    }
  }

  present(
    raw: AttributePreview,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<AttributePreviewPresented> {
    return {
      status,
      data: {
        attribute: this.parse(raw),
      },
    }
  }

  presentMany(
    raws: AttributePreview[],
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<AttributesPreviewsPresented> {
    return {
      status,
      data: {
        attributes: raws.map(this.parse),
      },
    }
  }
}
