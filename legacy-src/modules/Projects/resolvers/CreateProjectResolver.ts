import { RoutesAvailable } from '@config/routes/routesAvailable'
import { ProjectsResponse } from '@modules/Projects/dtos/models/ProjectsResponse'
import { CreateProjectService } from '@modules/Projects/services/CreateProjectService'
import InjectableDependencies from '@shared/container/types'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { inject, injectable } from 'tsyringe'
import { CreateProjectGateway } from '../gateways/CreateProjectGateway'

@injectable()
export class CreateProjectResolver {
  constructor(
    @inject(InjectableDependencies.Services.CreateProjectService)
    private readonly createProjectService: CreateProjectService,
  ) {}

  async handle({ _data }: RequesterType<CreateProjectGateway>) {
    const data = new CreateProjectGateway(_data)

    const validationErrors = await validate(data)
    const projectsResponse = ProjectsResponse.create()

    if (validationErrors.length >= 1) {
      return projectsResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.createProjectService.execute({
      features: data.features,
      name: data.name,
      imageUrl: data.imageUrl,
      userId: data.userId,
      type: data.getTypeAsString() ?? undefined,
      structure: data.getTypeStructureAsString() ?? undefined,
      books: data.books ?? [],
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
        projects: [serviceResponse.value.project],
      },
      redirector: {
        isToRedirect: true,
        path: RoutesAvailable.project.to(
          serviceResponse.value.project.id.toString(),
        ),
      },
    })
  }
}
