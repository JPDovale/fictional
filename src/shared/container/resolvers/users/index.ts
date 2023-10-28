import { container } from 'tsyringe';
import { GetUserResolver } from '@modules/Users/resolvers/GetUserResolver';
import { Resolvers } from '../types';

container.registerSingleton<GetUserResolver>(
  Resolvers.GetUserResolver,
  GetUserResolver
);
