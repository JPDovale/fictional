import { IsUUID } from 'class-validator';

export class GetPersonInput {
  /**
   * userId
   */
  @IsUUID('all', {
    always: true,
    message: 'User id not is valid',
  })
  userId: string;

  /**
   * personId
   */
  @IsUUID('all', {
    always: true,
    message: 'Person id not is valid',
  })
  personId: string;

  constructor(data: GetPersonInput) {
    this.personId = data.personId;
    this.userId = data.userId;
  }
}
