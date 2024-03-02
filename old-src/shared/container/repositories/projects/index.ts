import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { container } from 'tsyringe';
import { ProjectsKnexRepository } from '@database/repositories/Project/implementations/ProjectsKnexRepository';
import { Repositories } from '../types';

container.registerSingleton<ProjectsRepository>(
  Repositories.ProjectsRepository,
  ProjectsKnexRepository
);
