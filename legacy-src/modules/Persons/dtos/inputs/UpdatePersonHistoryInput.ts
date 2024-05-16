import { IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdatePersonHistoryInput {
  /**
   * userId
   */
  @IsUUID('all', {
    always: true,
    message: 'User id not is valid',
  })
  userId: string

  /**
   * projectId
   */
  @IsUUID('all', {
    always: true,
    message: 'Project id not is valid',
  })
  projectId: string

  /**
   * personId
   */
  @IsUUID('all', {
    always: true,
    message: 'Person id not is valid',
  })
  personId: string

  /**
   *
   * History
   */
  @IsString({
    always: true,
    message: 'History not is valid',
  })
  @IsOptional()
  history: string | null

  constructor(data: UpdatePersonHistoryInput) {
    this.projectId = data.projectId
    this.userId = data.userId
    this.history = data.history
    this.personId = data.personId
  }
}
