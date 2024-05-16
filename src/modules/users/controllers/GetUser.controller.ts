import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { GetUserGateway } from '../gateways/GetUser.gateway'
import { GetUserService } from '../services/GetUser.service'
import { UserPresenter } from '../presenters/User.presenter'

@injectable()
export class GetUserController implements Controller<PresenterProps> {
  constructor(
    private readonly getUserGateway: GetUserGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getUserService: GetUserService,
    private readonly userPresenter: UserPresenter,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getUserGateway.transform(_data)

    const response = await this.getUserService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { user } = response.value

    return this.userPresenter.present(user)
  }
}
