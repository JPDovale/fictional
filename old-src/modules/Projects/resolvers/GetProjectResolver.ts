import { ProjectResponse } from '@modules/Projects/dtos/models/ProjectResponse'
import { GetProjectService } from '@modules/Projects/services/GetProjectService'
import InjectableDependencies from '@shared/container/types'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { inject, injectable } from 'tsyringe'
import { GetProjectGateway } from '../gateways/GetProjectGateway'

@injectable()
export class GetProjectResolver {
  constructor(
    @inject(InjectableDependencies.Services.GetProjectService)
    private readonly getProjectService: GetProjectService,
  ) { }

  async handle({ _data }: RequesterType<GetProjectGateway>) {
    const data = new GetProjectGateway(_data)

    const validationErrors = await validate(data)
    const projectResponse = ProjectResponse.create()

    if (validationErrors.length >= 1) {
      return projectResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.getProjectService.execute({
      userId: data.userId,
      projectId: data.projectId,
    })

    if (serviceResponse.isLeft()) {
      return projectResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      })
    }

    return projectResponse.send({
      status: 200,
      data: {
        project: serviceResponse.value.project,
      },
    })
  }
}
