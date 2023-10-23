// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';
import { BookFile } from '@database/repositories/Book/types';

declare module 'knex/types/tables' {
  interface Tables {
    books: BookFile;
  }
}
