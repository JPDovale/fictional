import { IsOptional, IsUUID } from 'class-validator';

export class GetUserInput {
  @IsUUID('all', {
    always: true,
    message: 'This field is required and needs to are valid UUID',
  })
  @IsOptional()
  id?: string;

  constructor(data: GetUserInput) {
    this.id = data.id;
  }
}
