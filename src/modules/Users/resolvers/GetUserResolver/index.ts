import { GetUserInput } from '@modules/Users/dtos/inputs/GetUserInput';
import { UserResponse } from '@modules/Users/dtos/models/UserResponse';
import { User } from '@modules/Users/models/User';
import { CreateUserService } from '@modules/Users/services/CreateUserService';
import { GetUserService } from '@modules/Users/services/GetUserService';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { container } from 'tsyringe';

export class GetUserResolver {
  private readonly getUserService: GetUserService =
    container.resolve(GetUserService);

  private readonly createUserService: CreateUserService =
    container.resolve(CreateUserService);

  async handle({ _data }: RequesterType<GetUserInput>) {
    const data = new GetUserInput(_data);

    const validationErrors = await validate(data);
    const userResponse = UserResponse.create();

    if (validationErrors.length >= 1) {
      return userResponse.sendErrorValidation(validationErrors);
    }

    let user: User | null;

    const serviceResponse = await this.getUserService.execute({
      id: data.id ?? '',
    });

    if (serviceResponse.isLeft()) {
      const newUserResponse = await this.createUserService.execute({
        email: 'non-set',
        name: `MagiScrita User ${
          (Math.random() * 100).toString().split('.')[1]
        }`,
      });

      if (newUserResponse.isRight()) {
        user = newUserResponse.value.user;
      } else {
        return userResponse.send({
          status: newUserResponse.value.status,
          error: newUserResponse.value.message,
        });
      }
    } else {
      user = serviceResponse.value.user;
    }

    return userResponse.send({
      status: 200,
      data: {
        user: user!,
      },
    });
  }
}
