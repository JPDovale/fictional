import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonInput {
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
  @IsOptional()
  name: string | null;

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
  lastName: string | null;

  /**
   * biographic
   */
  @IsString({
    always: true,
    message: 'Biographic is required to create an new person',
  })
  @MinLength(2, {
    always: true,
    message: 'The Biographic of person require at least tow charactery',
  })
  @MaxLength(450, {
    always: true,
    message: 'The Biographic of person cannot exceed 450 charactery',
  })
  biographic: string;

  /**
   * imageUrl
   */
  @IsString()
  @IsOptional()
  imageUrl?: string | null;

  /**
   * age
   */
  @IsNumber()
  @IsOptional()
  age: number | null;

  constructor(data: CreatePersonInput) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.projectId = data.projectId;
    this.imageUrl = data.imageUrl;
    this.userId = data.userId;
    this.biographic = data.biographic;
    this.age = data.age;
  }
}
