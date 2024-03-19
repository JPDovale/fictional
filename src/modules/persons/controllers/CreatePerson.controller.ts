import { Controller, Request } from '@shared/core/contracts/Controller'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { CreatePersonGateway } from '../gateways/CreatePerson.gateway'
import { CreatePersonService } from '../services/CreatePerson.service'
import { PersonPresenter } from '../presenters/Person.presenter'

@injectable()
export class CreatePersonController implements Controller<PresenterProps> {
  constructor(
    private readonly createPersonGateway: CreatePersonGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly createPersonService: CreatePersonService,
    private readonly personPresenter: PersonPresenter,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.createPersonGateway.transform(_data)

    const response = await this.createPersonService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { person } = response.value

    return this.personPresenter.present(person, StatusCode.CREATED)
  }
}
