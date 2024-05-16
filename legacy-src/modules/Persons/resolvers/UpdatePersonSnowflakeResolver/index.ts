import { UpdatePersonSnowflakeInput } from '@modules/Persons/dtos/inputs/UpdatePersonSnowflakeInput'
import { UpdatePersonSnowflakeService } from '@modules/Persons/services/UpdatePersonSnowflakeService'
import { RequesterType } from '@shared/req/RequesterType'
import { EmptyResponse } from '@shared/res/EmptyResponse'
import { validate } from 'class-validator'
import { container } from 'tsyringe'

export class UpdatePersonSnowflakeResolver {
  private readonly updatePersonSnowflakeService: UpdatePersonSnowflakeService =
    container.resolve(UpdatePersonSnowflakeService)

  async handle({ _data }: RequesterType<UpdatePersonSnowflakeInput>) {
    const data = new UpdatePersonSnowflakeInput(_data)

    const validationErrors = await validate(data)
    const emptyResponse = EmptyResponse.create()

    if (validationErrors.length > 0) {
      return emptyResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.updatePersonSnowflakeService.execute({
      projectId: data.projectId,
      userId: data.userId,
      personId: data.personId,
      base: {
        apprenticeship: data.baseApprenticeship,
        function: data.baseFunction,
        motivation: data.baseMotivation,
        objective: data.baseObjective,
        obstacle: data.baseObstacle,
        povByThisEye: data.basePovByThisEye,
      },
      expansion: {
        apprenticeship: data.expansionApprenticeship,
        function: data.expansionFunction,
        motivation: data.expansionMotivation,
        objective: data.expansionObjective,
        obstacle: data.expansionObstacle,
        povByThisEye: data.expansionPovByThisEye,
      },
    })

    if (serviceResponse.isLeft()) {
      return emptyResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      })
    }

    return emptyResponse.send({
      status: 200,
    })
  }
}
