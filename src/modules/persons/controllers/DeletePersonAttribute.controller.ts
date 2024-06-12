import { Controller, Request } from '@shared/core/contracts/Controller';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter';
import { EmptyPresenter } from '@infra/requester/presenters/Empty.presenter';
import { DeletePersonAttributeGateway } from '../gateways/DeletePersonAttribute.gateway';
import { DeletePersonAttributeService } from '../services/DeletePersonAttribute.service';

@injectable()
export class DeletePersonAttributeController
  implements Controller<PresenterProps>
{
  constructor(
    private readonly deletePersonAttributeGateway: DeletePersonAttributeGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly deletePersonAttributeService: DeletePersonAttributeService,
    private readonly emptyPresenter: EmptyPresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.deletePersonAttributeGateway.transform(_data);

    const response = await this.deletePersonAttributeService.execute(body);

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    return this.emptyPresenter.present();
  }
}
