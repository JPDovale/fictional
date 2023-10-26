import { container } from 'tsyringe';
import { GetUserService } from '@modules/Users/services/GetUserService';
import { Services } from '../types';

container.registerSingleton<GetUserService>(
  Services.GetUserService,
  GetUserService
);
