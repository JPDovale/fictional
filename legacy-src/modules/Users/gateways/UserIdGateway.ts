import { IsUUID } from 'class-validator'

export class UserIdGateway {
  @IsUUID('all', {
    always: true,
    message: 'This field is required and needs to are valid UUID',
  })
  userId: string

  constructor(data: UserIdGateway) {
    this.userId = data.userId
  }
}
