import { container } from 'tsyringe';
import { GetUserService } from '@modules/Users/services/GetUserService';
import { Services } from '../types';
import { CreateUserService } from '@modules/Users/services/CreateUserService';

container.registerSingleton<GetUserService>(
  Services.GetUserService,
  GetUserService
);

container.registerSingleton<CreateUserService>(
  Services.CreateUserService,
  CreateUserService
);
