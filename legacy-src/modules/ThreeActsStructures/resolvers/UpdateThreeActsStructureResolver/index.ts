import { UpdateThreeActsStructureInput } from '@modules/ThreeActsStructures/dtos/inputs/UpdateThreeActsStructureInput'
import { UpdateThreeActsStructureService } from '@modules/ThreeActsStructures/services/UpdateThreeActsStructureService'
import InjectableDependencies from '@shared/container/types'
import { RequesterType } from '@shared/req/RequesterType'
import { EmptyResponse } from '@shared/res/EmptyResponse'
import { validate } from 'class-validator'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateThreeActsStructureResolver {
  constructor(
    @inject(InjectableDependencies.Services.UpdateThreeActsStructureService)
    private readonly updateThreeActsStructureService: UpdateThreeActsStructureService,
  ) {}

  async handle({ _data }: RequesterType<UpdateThreeActsStructureInput>) {
    const data = new UpdateThreeActsStructureInput(_data)

    const validationErrors = await validate(data)
    const updateThreeActsStructureResponse = EmptyResponse.create()

    if (validationErrors.length >= 1) {
      return updateThreeActsStructureResponse.sendErrorValidation(
        validationErrors,
      )
    }

    const serviceResponse = await this.updateThreeActsStructureService.execute({
      userId: data.userId,
      projectId: data.projectId,
      act1: data.act1,
      act2: data.act2,
      act3: data.act3,
      bookId: data.bookId,
    })

    if (serviceResponse.isLeft()) {
      return updateThreeActsStructureResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      })
    }

    return updateThreeActsStructureResponse.send({
      status: 200,
    })
  }
}
