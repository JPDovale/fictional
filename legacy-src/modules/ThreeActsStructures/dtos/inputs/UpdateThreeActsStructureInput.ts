import { IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateThreeActsStructureInput {
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

  @IsUUID('all', {
    always: true,
    message: 'Project id not is valid',
  })
  @IsOptional()
  bookId?: string

  @IsString({
    always: true,
    message: 'Acts can be an valid string',
  })
  @IsOptional()
  act1?: string | null

  @IsString({
    always: true,
    message: 'Acts can be an valid string',
  })
  @IsOptional()
  act2?: string | null

  @IsString({
    always: true,
    message: 'Acts can be an valid string',
  })
  @IsOptional()
  act3?: string | null

  constructor(data: UpdateThreeActsStructureInput) {
    this.userId = data.userId
    this.projectId = data.projectId
    this.bookId = data.bookId
    this.act1 = data.act1
    this.act2 = data.act2
    this.act3 = data.act3
  }
}
