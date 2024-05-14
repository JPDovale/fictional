import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { GetPersonsGateway } from '../gateways/GetPersons.gateway'
import { GetPersonsService } from '../services/GetPersons.service'
import { PersonWithParentsPresenter } from '../presenters/PersonWithParents.presenter'

@injectable()
export class GetPersonsController implements Controller<PresenterProps> {
  constructor(
    private readonly getPersonsGateway: GetPersonsGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getPersonsService: GetPersonsService,
    private readonly personWithParentsPresenter: PersonWithParentsPresenter,
  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getPersonsGateway.transform(_data)

    const response = await this.getPersonsService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { persons } = response.value

    return this.personWithParentsPresenter.presentMany(persons)
  }
}
