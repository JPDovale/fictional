import { container } from 'tsyringe';
import { UpdateBookTextService } from '@modules/Books/services/UpdateBookTextService';
import { Services } from '../types';

container.registerSingleton<UpdateBookTextService>(
  Services.UpdateBookTextService,
  UpdateBookTextService
);
