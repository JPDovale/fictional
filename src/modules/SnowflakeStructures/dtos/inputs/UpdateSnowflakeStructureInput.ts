import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSnowflakeStructureInput {
  @IsUUID('all', {
    always: true,
    message: 'User id not is valid',
  })
  userId: string;

  @IsUUID('all', {
    always: true,
    message: 'Project id not is valid',
  })
  projectId: string;

  @IsUUID('all', {
    always: true,
    message: 'Project id not is valid',
  })
  @IsOptional()
  bookId?: string;

  @IsString({
    always: true,
    message: 'Central idia can be an valid string',
  })
  @IsOptional()
  centralIdia?: string | null;

  @IsString({
    always: true,
    message: 'Phrase 1 can be an valid string',
  })
  @IsOptional()
  phrase1?: string | null;

  @IsString({
    always: true,
    message: 'Phrase 2 can be an valid string',
  })
  @IsOptional()
  phrase2?: string | null;

  @IsString({
    always: true,
    message: 'Phrase 3 can be an valid string',
  })
  @IsOptional()
  phrase3?: string | null;

  @IsString({
    always: true,
    message: 'Phrase 4 can be an valid string',
  })
  @IsOptional()
  phrase4?: string | null;

  @IsString({
    always: true,
    message: 'Phrase 5 can be an valid string',
  })
  @IsOptional()
  phrase5?: string | null;

  @IsString({
    always: true,
    message: 'Paragraph 1 can be an valid string',
  })
  @IsOptional()
  paragraph1?: string | null;

  @IsString({
    always: true,
    message: 'Paragraph 2 can be an valid string',
  })
  @IsOptional()
  paragraph2?: string | null;

  @IsString({
    always: true,
    message: 'Paragraph 3 can be an valid string',
  })
  @IsOptional()
  paragraph3?: string | null;

  @IsString({
    always: true,
    message: 'Paragraph 4 can be an valid string',
  })
  @IsOptional()
  paragraph4?: string | null;

  @IsString({
    always: true,
    message: 'Paragraph 5 can be an valid string',
  })
  @IsOptional()
  paragraph5?: string | null;

  constructor(data: UpdateSnowflakeStructureInput) {
    this.userId = data.userId;
    this.projectId = data.projectId;
    this.bookId = data.bookId;
    this.centralIdia = data.centralIdia;
    this.phrase1 = data.phrase1;
    this.phrase2 = data.phrase2;
    this.phrase3 = data.phrase3;
    this.phrase4 = data.phrase4;
    this.phrase5 = data.phrase5;
    this.paragraph1 = data.paragraph1;
    this.paragraph2 = data.paragraph2;
    this.paragraph3 = data.paragraph3;
    this.paragraph4 = data.paragraph4;
    this.paragraph5 = data.paragraph5;
  }
}
