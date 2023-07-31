import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { container } from 'tsyringe';
import { ProjectsFilesRepository } from '@database/repositories/Project/implementations/ProjectsFilesRepository';
import { ProjectsToUserRepository } from '@database/repositories/Project/contracts/ProjectsToUserRepository';
import { ProjectsToUserFilesRepository } from '@database/repositories/Project/implementations/ProjectsToUserFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<ProjectsRepository>(
  Repositories.ProjectsRepository,
  ProjectsFilesRepository
);

container.registerSingleton<ProjectsToUserRepository>(
  Repositories.ProjectsToUserRepository,
  ProjectsToUserFilesRepository
);
