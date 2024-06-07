import { Controller, Request } from '@shared/core/contracts/Controller';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter';
import { GetPersonGateway } from '../gateways/GetPerson.gateway';
import { GetPersonService } from '../services/GetPerson.service';
import { PersonWithDetailsPresenter } from '../presenters/PersonWithDetails.presenter';

@injectable()
export class GetPersonController implements Controller<PresenterProps> {
  constructor(
    private readonly getPersonGateway: GetPersonGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getPersonService: GetPersonService,
    private readonly personWithDetaisPresenter: PersonWithDetailsPresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getPersonGateway.transform(_data);

    const response = await this.getPersonService.execute(body);

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    const { person } = response.value;

    return this.personWithDetaisPresenter.present(person);
  }
}
