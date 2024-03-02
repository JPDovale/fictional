import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePersonSnowflakeInput {
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
   * personId
   */
  @IsUUID('all', {
    always: true,
    message: 'Person id not is valid',
  })
  personId: string;

  /**
   *
   * Function
   */
  @IsString({
    always: true,
    message: 'Function not is valid',
  })
  @IsOptional()
  baseFunction: string | null;

  /**
   *
   * Objective
   */
  @IsString({
    always: true,
    message: 'Objective not is valid',
  })
  @IsOptional()
  baseObjective: string | null;

  /**
   *
   * Obstacle
   */
  @IsString({
    always: true,
    message: 'Obstacle not is valid',
  })
  @IsOptional()
  baseObstacle: string | null;

  /**
   *
   * Apprenticeship
   */
  @IsString({
    always: true,
    message: 'Apprenticeship not is valid',
  })
  @IsOptional()
  baseApprenticeship: string | null;

  /**
   *
   * Motivation
   */
  @IsString({
    always: true,
    message: 'Motivation not is valid',
  })
  @IsOptional()
  baseMotivation: string | null;

  /**
   *
   *PovByThisEye
   */
  @IsString({
    always: true,
    message: 'PovByThisEye not is valid',
  })
  @IsOptional()
  basePovByThisEye: string | null;

  /**
   *
   * Function
   */
  @IsString({
    always: true,
    message: 'Function not is valid',
  })
  @IsOptional()
  expansionFunction: string | null;

  /**
   *
   * Objective
   */
  @IsString({
    always: true,
    message: 'Objective not is valid',
  })
  @IsOptional()
  expansionObjective: string | null;

  /**
   *
   * Obstacle
   */
  @IsString({
    always: true,
    message: 'Obstacle not is valid',
  })
  @IsOptional()
  expansionObstacle: string | null;

  /**
   *
   * Apprenticeship
   */
  @IsString({
    always: true,
    message: 'Apprenticeship not is valid',
  })
  @IsOptional()
  expansionApprenticeship: string | null;

  /**
   *
   * Motivation
   */
  @IsString({
    always: true,
    message: 'Motivation not is valid',
  })
  @IsOptional()
  expansionMotivation: string | null;

  /**
   *
   *PovByThisEye
   */
  @IsString({
    always: true,
    message: 'PovByThisEye not is valid',
  })
  @IsOptional()
  expansionPovByThisEye: string | null;

  constructor(data: UpdatePersonSnowflakeInput) {
    this.projectId = data.projectId;
    this.userId = data.userId;
    this.personId = data.personId;
    this.baseApprenticeship = data.baseApprenticeship;
    this.baseFunction = data.baseFunction;
    this.baseMotivation = data.baseMotivation;
    this.baseObjective = data.baseObjective;
    this.baseObstacle = data.baseObstacle;
    this.basePovByThisEye = data.basePovByThisEye;
    this.expansionApprenticeship = data.expansionApprenticeship;
    this.expansionFunction = data.expansionFunction;
    this.expansionMotivation = data.expansionMotivation;
    this.expansionObjective = data.expansionObjective;
    this.expansionObstacle = data.expansionObstacle;
    this.expansionPovByThisEye = data.expansionPovByThisEye;
  }
}
