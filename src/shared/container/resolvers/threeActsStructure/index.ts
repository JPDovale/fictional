import { container } from 'tsyringe';
import { UpdateThreeActsStructureResolver } from '@modules/ThreeActsStructures/resolvers/UpdateThreeActsStructureResolver';
import { Resolvers } from '../types';

container.registerSingleton<UpdateThreeActsStructureResolver>(
  Resolvers.UpdateThreeActsStructureResolver,
  UpdateThreeActsStructureResolver
);
