import { PersonsResponse } from '@modules/Persons/dtos/models/PersonsResponse';
import { GetPersonsService } from '@modules/Persons/services/GetPersonsService';
import { UserIdInput } from '@modules/Users/dtos/inputs/UserIdInput';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class GetPersonsResolver {
  private readonly getPersonsService: GetPersonsService =
    container.resolve(GetPersonsService);

  async handle({ _data }: RequesterType<UserIdInput>) {
    const data = new UserIdInput(_data);

    const validationErrors = await validate(data);
    const personsResponse = PersonsResponse.create();

    if (validationErrors.length > 0) {
      return personsResponse.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.getPersonsService.execute({
      userId: data.userId,
    });

    if (serviceResponse.isLeft()) {
      return personsResponse.send({
        status: serviceResponse.value.status,
        error: serviceResponse.value.message,
      });
    }

    return personsResponse.send({
      status: 200,
      data: {
        persons: serviceResponse.value.persons,
      },
    });
  }
}
