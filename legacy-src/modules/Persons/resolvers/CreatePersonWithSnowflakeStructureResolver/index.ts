import { RoutesAvailable } from '@config/routes/routesAvailable'
import { CreatePersonWithSnowflakeStructureInput } from '@modules/Persons/dtos/inputs/CreatePersonWithSnowflakeStructureInput'
import { PersonsResponse } from '@modules/Persons/dtos/models/PersonsResponse'
import { CreatePersonWithSnowflakeStructureService } from '@modules/Persons/services/CreatePersonWithSnowflakeStructureService'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { container } from 'tsyringe'

export class CreatePersonWithSnowflakeStructureResolver {
  private readonly createPersonWithSnowflakeStructureService: CreatePersonWithSnowflakeStructureService =
    container.resolve(CreatePersonWithSnowflakeStructureService)

  async handle({
    _data,
  }: RequesterType<CreatePersonWithSnowflakeStructureInput>) {
    const data = new CreatePersonWithSnowflakeStructureInput(_data)

    const validationErrors = await validate(data)
    const personsResponse = PersonsResponse.create()

    if (validationErrors.length > 0) {
      return personsResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse =
      await this.createPersonWithSnowflakeStructureService.execute({
        lastName: data.lastName ?? undefined,
        name: data.name ?? undefined,
        projectId: data.projectId,
        userId: data.userId,
        bookId: data.bookId,
        imageUrl: data.imageUrl ?? undefined,
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
        persons: [serviceResponse.value.person],
      },
      redirector: {
        isToRedirect: true,
        path: RoutesAvailable.projectPerson.to(
          serviceResponse.value.person.projectId.toString(),
          serviceResponse.value.person.id.toString(),
        ),
      },
    })
  }
}
