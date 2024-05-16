import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { GetAttributesPreviewGateway } from '../gateways/GetAttributesPreview.gateway'
import { GetAttributesPreviewService } from '../services/GetAttributesPreview.service'
import { AttributePreviewPresenter } from '../presenters/AttributesPreview.presenter'

@injectable()
export class GetAttributesPreviewController
  implements Controller<PresenterProps>
{
  constructor(
    private readonly getAttributesPreviewGateway: GetAttributesPreviewGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getAttributesPreviewService: GetAttributesPreviewService,
    private readonly attributePreviewPresenter: AttributePreviewPresenter,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getAttributesPreviewGateway.transform(_data)

    const response = await this.getAttributesPreviewService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { attributes } = response.value

    return this.attributePreviewPresenter.presentMany(attributes)
  }
}
