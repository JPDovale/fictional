import { GetProjectInput } from '@modules/Projects/dtos/inputs/GetProjectInput';
import { ProjectResponse } from '@modules/Projects/dtos/models/ProjectResponse';
import { GetProjectService } from '@modules/Projects/services/GetProjectService';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class GetProjectResolver {
  private readonly getProjectService: GetProjectService =
    container.resolve(GetProjectService);

  async handle({ _data }: RequesterType<GetProjectInput>) {
    const data = new GetProjectInput(_data);

    const validationErrors = await validate(data);
    const projectResponse = ProjectResponse.create();

    if (validationErrors.length >= 1) {
      return projectResponse.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.getProjectService.execute({
      userId: data.userId,
      projectId: data.projectId,
    });

    if (serviceResponse.isLeft()) {
      return projectResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      });
    }

    return projectResponse.send({
      status: 200,
      data: {
        project: serviceResponse.value.project,
      },
    });
  }
}
