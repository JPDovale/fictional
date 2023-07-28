import { ProjectsResponse } from '@modules/Projects/dtos/models/ProjectsResponse';
import { GetProjectsService } from '@modules/Projects/services/GetProjectsService';
import { UserIdInput } from '@modules/Users/dtos/inputs/UserIdInput';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class GetProjectsResolver {
  private readonly getProjectsService: GetProjectsService =
    container.resolve(GetProjectsService);

  async handle({ _data }: RequesterType<UserIdInput>) {
    const data = new UserIdInput(_data);

    const validationErrors = await validate(data);
    const projectsResponse = ProjectsResponse.create();

    if (validationErrors.length >= 1) {
      return projectsResponse.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.getProjectsService.execute({
      userId: data.userId,
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
        projects: serviceResponse.value.projects,
      },
    });
  }
}
