import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository';
import { container } from 'tsyringe';
import { SnowflakeStructuresFilesRepository } from '@database/repositories/SnowflakeStructure/implementations/SnowflakeStructuresFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<SnowflakeStructuresRepository>(
  Repositories.SnowflakeStructuresRepository,
  SnowflakeStructuresFilesRepository
);
