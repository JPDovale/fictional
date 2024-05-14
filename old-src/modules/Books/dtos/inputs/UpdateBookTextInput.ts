import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateBookTextInput {
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
   * bookId
   */
  @IsUUID('all', {
    always: true,
    message: 'Book id not is valid',
  })
  bookId: string;

  /**
   *
   * Text
   */
  @IsString({
    always: true,
    message: 'Text not is valid',
  })
  @IsOptional()
  text: string | null;

  constructor(data: UpdateBookTextInput) {
    this.projectId = data.projectId;
    this.userId = data.userId;
    this.text = data.text;
    this.bookId = data.bookId;
  }
}
