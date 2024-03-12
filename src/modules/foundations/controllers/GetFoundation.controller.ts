import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { GetFoundationGateway } from '../gateways/GetFoundation.gateway'
import { GetFoundationService } from '../services/GetFoundation.service'
import { FoundationPresenter } from '../presenters/Foundation.presenter'

@injectable()
export class GetFoundationController implements Controller<PresenterProps> {
  constructor(
    private readonly getFoundationGateway: GetFoundationGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getFoundationService: GetFoundationService,
    private readonly foundationPresenter: FoundationPresenter,
  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getFoundationGateway.transform(_data)

    const response = await this.getFoundationService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { foundation } = response.value

    return this.foundationPresenter.present(foundation)
  }
}
