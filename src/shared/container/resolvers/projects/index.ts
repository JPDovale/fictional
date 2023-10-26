import { container } from 'tsyringe';
import { CreateProjectResolver } from '@modules/Projects/resolvers/CreateProjectResolver';
import { GetProjectResolver } from '@modules/Projects/resolvers/GetProjectResolver';
import { GetProjectsResolver } from '@modules/Projects/resolvers/GetProjectsResolver';
import { Resolvers } from '../types';

container.registerSingleton<CreateProjectResolver>(
  Resolvers.CreateProjectResolver,
  CreateProjectResolver
);

container.registerSingleton<GetProjectResolver>(
  Resolvers.GetProjectResolver,
  GetProjectResolver
);

container.registerSingleton<GetProjectsResolver>(
  Resolvers.GetProjectsResolver,
  GetProjectsResolver
);
