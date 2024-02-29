import { CreateUserService } from '@modules/Users/services/CreateUserService'
import { GetUserService } from '@modules/Users/services/GetUserService'
import InjectableDependencies from '@shared/container/types'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { inject, injectable } from 'tsyringe'
import { UserPresenter } from '../presenters/UserPresenter'
import { GetUserGateway } from '../gateways/GetUserGateway'

@injectable()
export class GetUserResolver {
  constructor(
    @inject(InjectableDependencies.Services.GetUserService)
    private readonly getUserService: GetUserService,

    @inject(InjectableDependencies.Services.CreateUserService)
    private readonly createUserService: CreateUserService,
  ) { }

  async handle({ _data }: RequesterType<GetUserGateway>) {
    const data = new GetUserGateway(_data)

    const validationErrors = await validate(data)
    const userPresenter = UserPresenter.create()

    if (validationErrors.length >= 1) {
      return userPresenter.sendErrorValidation(validationErrors)
    }

    const getUserServiceResponse = await this.getUserService.execute({
      id: data.id ?? '',
    })

    if (getUserServiceResponse.isRight()) {
      const { user } = getUserServiceResponse.value

      return userPresenter.send({
        status: 200,
        data: {
          user,
        },
      })
    }

    const newUserServiceResponse = await this.createUserService.execute({
      email: 'non-set',
      name: `MagiScrita User ${(Math.random() * 100).toString().split('.')[1]}`,
    })

    if (newUserServiceResponse.isLeft()) {
      return userPresenter.send({
        status: 400,
        error: 'Some error ocurred',
      })
    }

    const { user } = newUserServiceResponse.value

    return userPresenter.send({
      status: 200,
      data: {
        user,
      },
    })
  }
}
