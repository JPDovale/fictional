import { container } from 'tsyringe';
import { CreateProjectService } from '@modules/Projects/services/CreateProjectService';
import { GetProjectService } from '@modules/Projects/services/GetProjectService';
import { GetProjectsService } from '@modules/Projects/services/GetProjectsService';
import { Services } from '../types';

container.registerSingleton<CreateProjectService>(
  Services.CreateProjectService,
  CreateProjectService
);

container.registerSingleton<GetProjectService>(
  Services.GetProjectService,
  GetProjectService
);

container.registerSingleton<GetProjectsService>(
  Services.GetProjectsService,
  GetProjectsService
);
