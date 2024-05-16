import { RoutesAvailable } from '@config/routes/routesAvailable'
import { CreatePersonInput } from '@modules/Persons/dtos/inputs/CreatePersonInput'
import { PersonsResponse } from '@modules/Persons/dtos/models/PersonsResponse'
import { CreatePersonService } from '@modules/Persons/services/CreatePersonService'
import { RequesterType } from '@shared/req/RequesterType'
import { validate } from 'class-validator'
import { container } from 'tsyringe'

export class CreatePersonResolver {
  private readonly createPersonService: CreatePersonService =
    container.resolve(CreatePersonService)

  async handle({ _data }: RequesterType<CreatePersonInput>) {
    const data = new CreatePersonInput(_data)

    const validationErrors = await validate(data)
    const personsResponse = PersonsResponse.create()

    if (validationErrors.length > 0) {
      return personsResponse.sendErrorValidation(validationErrors)
    }

    const serviceResponse = await this.createPersonService.execute({
      biographic: data.biographic,
      lastName: data.lastName ?? undefined,
      name: data.name ?? undefined,
      projectId: data.projectId,
      userId: data.userId,
      age: data.age ?? undefined,
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
