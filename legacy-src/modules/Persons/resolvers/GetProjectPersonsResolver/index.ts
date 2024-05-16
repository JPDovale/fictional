import { GetProjectPersonsInput } from '@modules/Persons/dtos/inputs/GetProjectPersonsInput'
import { PersonsResponse } from '@modules/Persons/dtos/models/PersonsResponse'
import { GetProjectPersonsService } from '@modules/Persons/services/GetProjectPersonsService'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { container } from 'tsyringe'

export class GetProjectPersonsResolver {
  private readonly getProjectPersonsService: GetProjectPersonsService =
    container.resolve(GetProjectPersonsService)

  async handle({ _data }: RequesterType<GetProjectPersonsInput>) {
    const data = new GetProjectPersonsInput(_data)

    const validationErrors = await validate(data)
    const personsResponse = PersonsResponse.create()

    if (validationErrors.length > 0) {
      return personsResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.getProjectPersonsService.execute({
      projectId: data.projectId,
      userId: data.userId,
    })

    if (serviceResponse.isLeft()) {
      return personsResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      })
    }

    return personsResponse.send({
      status: 200,
      data: {
        persons: serviceResponse.value.persons,
      },
    })
  }
}
