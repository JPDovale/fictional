import { User } from '@modules/Users/models/User';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { Response, ResponseProps } from '@shared/res/Response';
import { ValidationError } from 'class-validator';
import { UserResponsePartied } from './types';

export class UserResponse extends Response<
  UserResponsePartied,
  UserResponse,
  User
>() {
  static create() {
    return new UserResponse();
  }

  sendErrorValidation(errors: ValidationError[]): UserResponse {
    return new UserResponse(makeValidationErrors(errors));
  }

  send(props: ResponseProps<{ user: User }>) {
    const dataPartied = this.parse(props.data?.user ?? null);
    const propsToResponse: ResponseProps<UserResponsePartied> = {
      ...props,
      data: dataPartied,
    };
    return new UserResponse(propsToResponse);
  }

  parse(user: User | null): UserResponsePartied | null {
    if (!user) return null;

    const responsePartied: UserResponsePartied = {
      user: {
        infos: {
          age: user.age,
          avatar: {
            alt: user.name,
            url: user.avatarUrl,
          },
          cratedAt: user.createdAt,
          email: user.email,
          name: user.name,
          sex: user.sex,
          username: user.username,
        },
        account: {
          id: user.id.toString(),
        },
      },
    };

    return responsePartied;
  }
}
