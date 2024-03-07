import { Controller, Request } from '@shared/core/contracts/Controller'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { CreateUserGateway } from '../gateways/CreateUser.gateway'
import { CreateUserService } from '../services/CreateUser.service'
import { UserPresenter } from '../presenters/User.presenter'

@injectable()
export class CreateUserController implements Controller<PresenterProps> {
  constructor(
    private readonly createUserGateway: CreateUserGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly createUserService: CreateUserService,
    private readonly userPresenter: UserPresenter,
  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.createUserGateway.transform(_data)

    const response = await this.createUserService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { user } = response.value

    return this.userPresenter.present(user, StatusCode.CREATED)
  }
}
