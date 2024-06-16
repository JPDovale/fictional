import { Controller, Request } from '@shared/core/contracts/Controller';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter';
import { EmptyPresenter } from '@infra/requester/presenters/Empty.presenter';
import { DeletePersonAttributeMutationGateway } from '../gateways/DeletePersonAttributeMutation.gateway';
import { DeletePersonAttributeMutationService } from '../services/DeletePersonAttributeMutation.service';

@injectable()
export class DeletePersonAttributeMutationController
  implements Controller<PresenterProps>
{
  constructor(
    private readonly deletePersonAttributeMutationGateway: DeletePersonAttributeMutationGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly deletePersonAttributeMutationService: DeletePersonAttributeMutationService,
    private readonly emptyPresenter: EmptyPresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.deletePersonAttributeMutationGateway.transform(_data);

    const response = await this.deletePersonAttributeMutationService.execute(
      body
    );

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    return this.emptyPresenter.present();
  }
}
