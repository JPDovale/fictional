import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { container } from 'tsyringe';
import { ThreeActsStructuresFilesRepository } from '@database/repositories/ThreeActsStructure/implementations/ThreeActsStructuresFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<ThreeActsStructuresRepository>(
  Repositories.ThreeActsStructuresRepository,
  ThreeActsStructuresFilesRepository
);
