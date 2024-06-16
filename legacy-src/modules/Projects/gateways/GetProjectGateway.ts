import { IsUUID } from 'class-validator'

export class GetProjectGateway {
  @IsUUID('all', {
    always: true,
    message: 'User id not is valid',
  })
  userId: string

  @IsUUID('all', {
    always: true,
    message: 'Project id not is valid',
  })
  projectId: string

  constructor(data: GetProjectGateway) {
    this.userId = data.userId
    this.projectId = data.projectId
  }
}
