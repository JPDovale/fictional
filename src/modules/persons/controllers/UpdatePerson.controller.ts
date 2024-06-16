import { Controller, Request } from '@shared/core/contracts/Controller'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { PersonPresenter } from '../presenters/Person.presenter'
import { UpdatePersonGateway } from '../gateways/UpdatePerson.gateway'
import { UpdatePersonService } from '../services/UpdatePerson.service'

@injectable()
export class UpdatePersonController implements Controller<PresenterProps> {
  constructor(
    private readonly updatePersonGateway: UpdatePersonGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly updatePersonService: UpdatePersonService,
    private readonly personPresenter: PersonPresenter,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.updatePersonGateway.transform(_data)

    const response = await this.updatePersonService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { person } = response.value

    return this.personPresenter.present(person, StatusCode.OK)
  }
}
