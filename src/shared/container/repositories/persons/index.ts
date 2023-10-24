import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { container } from 'tsyringe';
import { PersonsKnexRepository } from '@database/repositories/Person/implementations/PersonsKnexRepository';
import { Repositories } from '../types';

container.registerSingleton<PersonsRepository>(
  Repositories.PersonsRepository,
  PersonsKnexRepository
);
