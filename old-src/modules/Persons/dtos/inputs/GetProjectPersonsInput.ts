import { IsUUID } from 'class-validator';

export class GetProjectPersonsInput {
  /**
   * userId
   */
  @IsUUID('all', {
    always: true,
    message: 'User id not is valid',
  })
  userId: string;

  /**
   * projectId
   */
  @IsUUID('all', {
    always: true,
    message: 'Project id not is valid',
  })
  projectId: string;

  constructor(data: GetProjectPersonsInput) {
    this.projectId = data.projectId;
    this.userId = data.userId;
  }
}
