import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

export class CreatePersonWithSnowflakeStructureInput {
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
   * bookId
   */
  @IsUUID('all', {
    always: true,
    message: 'Book id not is valid',
  })
  bookId: string

  /**
   * name
   */
  @IsString({
    always: true,
    message: 'Name is required to create an new person',
  })
  @MaxLength(60, {
    always: true,
    message: 'The name of person cannot exceed 60 charactery',
  })
  name: string

  /**
   * lastName
   */
  @IsString({
    always: true,
    message: 'LastName is required to create an new person',
  })
  @MaxLength(60, {
    always: true,
    message: 'The lastname of person cannot exceed 60 charactery',
  })
  @IsOptional()
  lastName: string | null

  /**
   * imageUrl
   */
  @IsString()
  @IsOptional()
  imageUrl?: string | null

  constructor(data: CreatePersonWithSnowflakeStructureInput) {
    this.name = data.name
    this.lastName = data.lastName
    this.projectId = data.projectId
    this.imageUrl = data.imageUrl
    this.userId = data.userId
    this.bookId = data.bookId
  }
}
