import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { UpdateFoundationGateway } from '../gateways/UpdateFoundation.gateway'
import { UpdateFoundationService } from '../services/UpdateFoundation.service'
import { FoundationPresenter } from '../presenters/Foundation.presenter'

@injectable()
export class UpdateFoundationController implements Controller<PresenterProps> {
  constructor(
    private readonly updateFoundationGateway: UpdateFoundationGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly updateFoundationService: UpdateFoundationService,
    private readonly foundationPresenter: FoundationPresenter,
  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.updateFoundationGateway.transform(_data)

    const response = await this.updateFoundationService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { foundation } = response.value

    return this.foundationPresenter.present(foundation)
  }
}
