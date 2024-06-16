import { Controller, Request } from '@shared/core/contracts/Controller'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from '@infra/requester/presenters/Error.presenter'
import { GetProjectGateway } from '../gateways/GetProject.gateway'
import { GetProjectService } from '../services/GetProject.service'
import { ProjectPresenter } from '../presenters/Project.presenter'

@injectable()
export class GetProjectController implements Controller<PresenterProps> {
  constructor(
    private readonly getProjectGateway: GetProjectGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly getProjectService: GetProjectService,
    private readonly projectPresenter: ProjectPresenter,
  ) {}

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.getProjectGateway.transform(_data)

    const response = await this.getProjectService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { project } = response.value

    return this.projectPresenter.present(project)
  }
}
