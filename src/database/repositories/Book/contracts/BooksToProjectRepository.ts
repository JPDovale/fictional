import { Either } from '@shared/core/error/Either';
import { AddPropsBooksToProject, CreatePropsBooksToProject } from '../types';

export abstract class BooksToProjectRepository {
  abstract create({
    bookId,
    projectId,
  }: CreatePropsBooksToProject): Promise<Either<{}, {}>>;

  abstract add({
    bookId,
    projectId,
  }: AddPropsBooksToProject): Promise<Either<{}, {}>>;

  abstract createOrAdd(
    props: CreatePropsBooksToProject | AddPropsBooksToProject
  ): Promise<Either<{}, {}>>;

  abstract getBooksIdsPerProject(
    projectId: string
  ): Promise<Either<{}, string[]>>;
}
