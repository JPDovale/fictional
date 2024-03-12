import { Controller, Request } from '@shared/core/contracts/Controller'
import { injectable } from 'tsyringe'
import { ErrorPresenter } from 'src/infra/requester/presenters/Error.presenter'
import { PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { CreateProjectGateway } from '../gateways/CreateProject.gateway'
import { CreateProjectService } from '../services/CreateProject.service'
import { ProjectPresenter } from '../presenters/Project.presenter'

@injectable()
export class CreateProjectController implements Controller<PresenterProps> {
  constructor(
    private readonly createProjectGateway: CreateProjectGateway,
    private readonly errorPresenter: ErrorPresenter,
    private readonly createProjectService: CreateProjectService,
    private readonly projectPresenter: ProjectPresenter,
  ) { }

  async handle({ _data }: Request): Promise<PresenterProps> {
    const body = this.createProjectGateway.transform(_data)

    const response = await this.createProjectService.execute(body)

    if (response.isLeft()) {
      const error = response.value
      return this.errorPresenter.present(error)
    }

    const { project } = response.value

    return this.projectPresenter.present(project, StatusCode.CREATED)
  }
}
