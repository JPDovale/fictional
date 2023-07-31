import { UpdatePersonHistoryInput } from '@modules/Persons/dtos/inputs/UpdatePersonHistoryInput';
import { UpdatePersonHistoryService } from '@modules/Persons/services/UpdatePersonHistoryService';
import { RequesterType } from '@shared/req/RequesterType';
import { EmptyResponse } from '@shared/res/EmptyResponse';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class UpdatePersonHistoryResolver {
  private readonly updatePersonHistoryService: UpdatePersonHistoryService =
    container.resolve(UpdatePersonHistoryService);

  async handle({ _data }: RequesterType<UpdatePersonHistoryInput>) {
    const data = new UpdatePersonHistoryInput(_data);

    const validationErrors = await validate(data);
    const emptyResponse = EmptyResponse.create();

    if (validationErrors.length > 0) {
      return emptyResponse.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.updatePersonHistoryService.execute({
      projectId: data.projectId,
      userId: data.userId,
      history: data.history,
      personId: data.personId,
    });

    if (serviceResponse.isLeft()) {
      return emptyResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      });
    }

    return emptyResponse.send({
      status: 200,
    });
  }
}
