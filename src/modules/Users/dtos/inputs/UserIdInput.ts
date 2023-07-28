import { IsUUID } from 'class-validator';

export class UserIdInput {
  @IsUUID('all', {
    always: true,
    message: 'This field is required and needs to are valid UUID',
  })
  userId: string;

  constructor(data: UserIdInput) {
    this.userId = data.userId;
  }
}
