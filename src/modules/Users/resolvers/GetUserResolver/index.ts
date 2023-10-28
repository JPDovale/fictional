import { GetUserInput } from '@modules/Users/dtos/inputs/GetUserInput';
import { UserResponse } from '@modules/Users/dtos/models/UserResponse';
import { User } from '@modules/Users/models/User';
import { CreateUserService } from '@modules/Users/services/CreateUserService';
import { GetUserService } from '@modules/Users/services/GetUserService';
import InjectableDependencies from '@shared/container/types';
import { RequesterType } from '@shared/req/RequesterType';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserResolver {
  constructor(
    @inject(InjectableDependencies.Services.GetUserService)
    private readonly getUserService: GetUserService,

    @inject(InjectableDependencies.Services.CreateUserService)
    private readonly createUserService: CreateUserService
  ) {}

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
          status: 400,
          error: 'Some error ocurred',
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
