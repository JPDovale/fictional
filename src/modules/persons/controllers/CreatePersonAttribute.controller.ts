import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { CreatePersonAttributeGateway } from '../gateways/CreatePersonAttribute.gateway'
import { CreatePersonAttributeService } from '../services/CreatePersonAttribute.service'

@injectable()
export class CreatePersonAttributeController
  implements Controller<PresenterProps>
{
  constructor(
    private readonly createPersonAttributeGateway: CreatePersonAttributeGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly createPersonAttributeService: CreatePersonAttributeService,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.createPersonAttributeGateway.transform(_data)

    const response = await this.createPersonAttributeService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    return {
      status: StatusCode.CREATED,
    }
  }
}
