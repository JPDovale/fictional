import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { container } from 'tsyringe';
import { BooksFilesRepository } from '@database/repositories/Book/Implementations/BooksFilesRepository';
import { BooksToProjectRepository } from '@database/repositories/Book/contracts/BooksToProjectRepository';
import { BooksToProjectFilesRepository } from '@database/repositories/Book/Implementations/BooksToProjectFilesRepository';
import { BooksToUserRepository } from '@database/repositories/Book/contracts/BooksToUserRepository';
import { BooksToUserFilesRepository } from '@database/repositories/Book/Implementations/BooksToUserFilesRepository';
import { Repositories } from '../types';

container.registerSingleton<BooksRepository>(
  Repositories.BooksRepository,
  BooksFilesRepository
);

container.registerSingleton<BooksToProjectRepository>(
  Repositories.BooksToProjectRepository,
  BooksToProjectFilesRepository
);

container.registerSingleton<BooksToUserRepository>(
  Repositories.BooksToUserRepository,
  BooksToUserFilesRepository
);
