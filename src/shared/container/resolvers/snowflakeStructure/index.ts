import { container } from 'tsyringe';
import { UpdateSnowflakeStructureResolver } from '@modules/SnowflakeStructures/resolvers/UpdateSnowflakeStructureResolver';
import { Resolvers } from '../types';

container.registerSingleton<UpdateSnowflakeStructureResolver>(
  Resolvers.UpdateSnowflakeStructureResolver,
  UpdateSnowflakeStructureResolver
);
