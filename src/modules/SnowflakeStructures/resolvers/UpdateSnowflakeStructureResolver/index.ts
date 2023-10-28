import { UpdateSnowflakeStructureInput } from '@modules/SnowflakeStructures/dtos/inputs/UpdateSnowflakeStructureInput';
import { UpdateSnowflakeStructureService } from '@modules/SnowflakeStructures/services/UpdateSnowflakeStructureService';
import InjectableDependencies from '@shared/container/types';
import { RequesterType } from '@shared/req/RequesterType';
import { EmptyResponse } from '@shared/res/EmptyResponse';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateSnowflakeStructureResolver {
  constructor(
    @inject(InjectableDependencies.Services.UpdateSnowflakeStructureService)
    private readonly updateSnowflakeStructureService: UpdateSnowflakeStructureService
  ) {}

  async handle({ _data }: RequesterType<UpdateSnowflakeStructureInput>) {
    const data = new UpdateSnowflakeStructureInput(_data);

    const validationErrors = await validate(data);
    const updateThreeActsStructureResponse = EmptyResponse.create();

    if (validationErrors.length >= 1) {
      return updateThreeActsStructureResponse.sendErrorValidation(
        validationErrors
      );
    }

    const serviceResponse = await this.updateSnowflakeStructureService.execute({
      userId: data.userId,
      projectId: data.projectId,
      bookId: data.bookId,
      centralIdia: data.centralIdia,
      phrase1: data.phrase1,
      phrase2: data.phrase2,
      phrase3: data.phrase3,
      phrase4: data.phrase4,
      phrase5: data.phrase5,
      paragraph1: data.paragraph1,
      paragraph2: data.paragraph2,
      paragraph3: data.paragraph3,
      paragraph4: data.paragraph4,
      paragraph5: data.paragraph5,
    });

    if (serviceResponse.isLeft()) {
      return updateThreeActsStructureResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      });
    }

    return updateThreeActsStructureResponse.send({
      status: 200,
    });
  }
}
