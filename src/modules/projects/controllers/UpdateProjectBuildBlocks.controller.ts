import { Controller, Request } from '@shared/core/contracts/Controller';
import { injectable } from 'tsyringe';
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter';
import { PresenterProps } from '@shared/core/contracts/Presenter';
import { ProjectPresenter } from '../presenters/Project.presenter';
import { UpdateProjectBuildBlocksGateway } from '../gateways/UpdateProjectBuildBlocks.gateway';
import { UpdateProjectBuildBlocksService } from '../services/UpdateProjectBuildBlocks.service';

@injectable()
export class UpdateProjectBuildBlocksController
  implements Controller<PresenterProps>
{
  constructor(
    private readonly updateProjectBuildBlocksGateway: UpdateProjectBuildBlocksGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly updateProjectBuildBlocksService: UpdateProjectBuildBlocksService,
    private readonly projectPresenter: ProjectPresenter
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.updateProjectBuildBlocksGateway.transform(_data);

    const response = await this.updateProjectBuildBlocksService.execute(body);

    if (response.isLeft()) {
      const error = response.value;
      return this.errorPresenter.present(error);
    }

    const { project } = response.value;

    return this.projectPresenter.present(project);
  }
}
