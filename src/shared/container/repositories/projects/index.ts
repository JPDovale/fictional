import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { container } from 'tsyringe';
import { ThreeActsStructuresRepository } from '@database/repositories/Project/contracts/ThreeActsStructuresRepository';
import { ProjectsFilesRepository } from '@database/repositories/Project/implementations/ProjectsFilesRepository';
import { ProjectsToUserRepository } from '@database/repositories/ProjectsToUser/contracts/ProjectsToUserRepository';
import { ProjectsToUserFilesRepository } from '@database/repositories/ProjectsToUser/implementations/ProjectsToUserFilesRepository';
import { ThreeActsStructuresFilesRepository } from '@database/repositories/Project/implementations/ThreeActsStructuresFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<ProjectsRepository>(
  Repositories.ProjectsRepository,
  ProjectsFilesRepository
);

container.registerSingleton<ThreeActsStructuresRepository>(
  Repositories.ThreeActsStructuresRepository,
  ThreeActsStructuresFilesRepository
);

container.registerSingleton<ProjectsToUserRepository>(
  Repositories.ProjectsToUserRepository,
  ProjectsToUserFilesRepository
);
