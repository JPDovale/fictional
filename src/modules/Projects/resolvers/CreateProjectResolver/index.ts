import { RoutesAvailable } from '@config/routes/routesAvailable';
import { CreateProjectInput } from '@modules/Projects/dtos/inputs/CreateProjectInput';
import { ProjectsResponse } from '@modules/Projects/dtos/models/ProjectsResponse';
import { CreateProjectService } from '@modules/Projects/services/CreateProjectService';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class CreateProjectResolver {
  private readonly createProjectService: CreateProjectService =
    container.resolve(CreateProjectService);

  async handle({ _data }: RequesterType<CreateProjectInput>) {
    const data = new CreateProjectInput(_data);

    const validationErrors = await validate(data);
    const projectsResponse = ProjectsResponse.create();

    if (validationErrors.length >= 1) {
      return projectsResponse.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.createProjectService.execute({
      features: data.features,
      name: data.name,
      imageUrl: data.imageUrl,
      userId: data.userId,
      type: data.getTypeAsString() ?? undefined,
      structure: data.getTypeStructureAsString() ?? undefined,
    });

    if (serviceResponse.isLeft()) {
      return projectsResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      });
    }

    return projectsResponse.send({
      status: 200,
      data: {
        projects: [serviceResponse.value.project],
      },
      redirector: {
        isToRedirect: true,
        path: RoutesAvailable.projects.id.to(
          serviceResponse.value.project.id.toString()
        ),
      },
    });
  }
}
