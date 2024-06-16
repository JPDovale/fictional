import { Controller, Request } from '@shared/core/contracts/Controller'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { UpdateUserGateway } from '../gateways/UpdateUser.gateway'
import { UpdateUserService } from '../services/UpdateUser.service'
import { UserPresenter } from '../presenters/User.presenter'

@injectable()
export class UpdateUserController implements Controller<PresenterProps> {
  constructor(
    private readonly updateUserGateway: UpdateUserGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly updateUserService: UpdateUserService,
    private readonly userPresenter: UserPresenter,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.updateUserGateway.transform(_data)

    const response = await this.updateUserService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { user } = response.value

    return this.userPresenter.present(user)
  }
}
