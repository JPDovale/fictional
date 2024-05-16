import { IsOptional, IsUUID } from 'class-validator'

export class GetUserGateway {
  @IsUUID('all', {
    always: true,
    message: 'This field is required and needs to are valid UUID',
  })
  @IsOptional()
  id?: string

  constructor(data: GetUserGateway) {
    this.id = data.id
  }
}
