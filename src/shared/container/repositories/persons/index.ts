import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { container } from 'tsyringe';
import { PersonsFilesRepository } from '@database/repositories/Person/implementations/PersonsFilesRepository';
import { PersonsToProjectRepository } from '@database/repositories/Person/contracts/PersonsToProjectRepository';
import { PersonsToProjectFilesRepository } from '@database/repositories/Person/implementations/PersonsToProjectFilesRepository';
import { PersonsToUserRepository } from '@database/repositories/Person/contracts/PersonsToUserRepository';
import { PersonsToUserFilesRepository } from '@database/repositories/Person/implementations/PersonsToUserFilesRepository';
import { PersonsToSnowflakeStructureRepository } from '@database/repositories/Person/contracts/PersonsToSnowflakeStructureRepository';
import { PersonsToSnowflakeStructureFilesRepository } from '@database/repositories/Person/implementations/PersonsToSnowflakeStructureFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<PersonsRepository>(
  Repositories.PersonsRepository,
  PersonsFilesRepository
);

container.registerSingleton<PersonsToProjectRepository>(
  Repositories.PersonsToProjectRepository,
  PersonsToProjectFilesRepository
);

container.registerSingleton<PersonsToUserRepository>(
  Repositories.PersonsToUserRepository,
  PersonsToUserFilesRepository
);

container.registerSingleton<PersonsToSnowflakeStructureRepository>(
  Repositories.PersonsToSnowflakeStructureRepository,
  PersonsToSnowflakeStructureFilesRepository
);
