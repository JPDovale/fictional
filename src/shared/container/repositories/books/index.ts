import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { container } from 'tsyringe';
import { BooksKnexRepository } from '@database/repositories/Book/Implementations/BooksKnexRepository';
import { Repositories } from '../types';

container.registerSingleton<BooksRepository>(
  Repositories.BooksRepository,
  BooksKnexRepository
);
