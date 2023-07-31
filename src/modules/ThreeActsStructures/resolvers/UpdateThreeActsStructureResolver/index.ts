import { UpdateThreeActsStructureInput } from '@modules/ThreeActsStructures/dtos/inputs/UpdateThreeActsStructureInput';
import { UpdateThreeActsStructureService } from '@modules/ThreeActsStructures/services/UpdateThreeActsStructureService';
import { RequesterType } from '@shared/req/RequesterType';
import { EmptyResponse } from '@shared/res/EmptyResponse';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class UpdateThreeActsStructureResolver {
  private readonly updateThreeActsStructureResolver: UpdateThreeActsStructureService =
    container.resolve(UpdateThreeActsStructureService);

  async handle({ _data }: RequesterType<UpdateThreeActsStructureInput>) {
    const data = new UpdateThreeActsStructureInput(_data);

    const validationErrors = await validate(data);
    const updateThreeActsStructureResponse = EmptyResponse.create();

    if (validationErrors.length >= 1) {
      return updateThreeActsStructureResponse.sendErrorValidation(
        validationErrors
      );
    }

    const serviceResponse = await this.updateThreeActsStructureResolver.execute(
      {
        userId: data.userId,
        projectId: data.projectId,
        act1: data.act1,
        act2: data.act2,
        act3: data.act3,
        bookId: data.bookId,
      }
    );

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
