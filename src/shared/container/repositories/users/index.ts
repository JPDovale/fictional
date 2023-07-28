import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { container } from 'tsyringe';
import { UsersFilesRepository } from '@database/repositories/User/implementations/UsersFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<UsersRepository>(
  Repositories.UsersRepository,
  UsersFilesRepository
);
