import { GetPersonInput } from '@modules/Persons/dtos/inputs/GetPersonInput';
import { PersonResponse } from '@modules/Persons/dtos/models/PersonResponse';
import { GetPersonService } from '@modules/Persons/services/GetPersonService';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class GetPersonResolver {
  private readonly getPersonService: GetPersonService =
    container.resolve(GetPersonService);

  async handle({ _data }: RequesterType<GetPersonInput>) {
    const data = new GetPersonInput(_data);

    const validationErrors = await validate(data);
    const personResponse = PersonResponse.create();

    if (validationErrors.length > 0) {
      return personResponse.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.getPersonService.execute({
      personId: data.personId,
      userId: data.userId,
    });

    if (serviceResponse.isLeft()) {
      return personResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      });
    }

    return personResponse.send({
      status: 200,
      data: {
        person: serviceResponse.value.person,
      },
    });
  }
}
