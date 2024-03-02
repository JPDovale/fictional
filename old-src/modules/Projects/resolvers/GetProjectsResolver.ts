import { ProjectsResponse } from '@modules/Projects/dtos/models/ProjectsResponse'
import { GetProjectsService } from '@modules/Projects/services/GetProjectsService'
import { UserIdGateway } from '@modules/Users/gateways/UserIdGateway'
import InjectableDependencies from '@shared/container/types'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetProjectsResolver {
  constructor(
    @inject(InjectableDependencies.Services.GetProjectsService)
    private readonly getProjectsService: GetProjectsService,
  ) { }

  async handle({ _data }: RequesterType<UserIdGateway>) {
    const data = new UserIdGateway(_data)

    const validationErrors = await validate(data)
    const projectsResponse = ProjectsResponse.create()

    if (validationErrors.length >= 1) {
      return projectsResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.getProjectsService.execute({
      userId: data.userId,
    })

    if (serviceResponse.isLeft()) {
      return projectsResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      })
    }

    return projectsResponse.send({
      status: 200,
      data: {
        projects: serviceResponse.value.projects,
      },
    })
  }
}
