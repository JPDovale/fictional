import { Controller, Request } from '@shared/core/contracts/Controller';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter';
import { DeletePersonGateway } from '../gateways/DeletePerson.gateway';
import { DeletePersonService } from '../services/DeletePerson.service';
import { EmptyPresenter } from '@infra/requester/presenters/Empty.presenter';

@injectable()
export class DeletePersonController implements Controller<PresenterProps> {
  constructor(
    private readonly deletePersonGateway: DeletePersonGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly deletePersonService: DeletePersonService,
    private readonly emptyPresenter: EmptyPresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.deletePersonGateway.transform(_data);

    const response = await this.deletePersonService.execute(body);

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    return this.emptyPresenter.present();
  }
}
