import { Book, BookStructureType } from '@modules/Books/models/Book';
import { Either } from '@shared/core/error/Either';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { BookFile } from '../types';

export abstract class BooksRepository {
  abstract create(book: Book): Promise<Either<{}, {}>>;

  abstract createMany(books: Book[]): Promise<Either<{}, {}>>;

  abstract findById(id: string): Promise<Either<{}, Book | null>>;

  abstract findByProjectId(projectId: string): Promise<Either<{}, Book[]>>;

  abstract save(book: Book): Promise<Either<{}, {}>>;

  static parserToFile(book: Book): BookFile {
    const bookFile: BookFile = {
      id: book.id.toString(),
      created_at: book.createdAt,
      image_filename: book.imageFilename,
      image_url: book.imageUrl,
      project_id: book.projectId.toString(),
      subtitle: book.subtitle,
      structure: book.structure,
      snowflake_structure_id: book.snowflakeStructureId?.toString() ?? null,
      three_acts_structure_id: book.threeActsStructureId?.toString() ?? null,
      title: book.title,
      updated_at: book.updatedAt,
      user_id: book.userId.toString(),
      text: book.text,
    };

    return bookFile;
  }

  static parser(bookReceived: BookFile): Book {
    const book = Book.create(
      {
        projectId: new UniqueEntityId(bookReceived.project_id),
        title: bookReceived.title,
        userId: new UniqueEntityId(bookReceived.user_id),
        createdAt: bookReceived.created_at,
        imageFilename: bookReceived.image_filename,
        imageUrl: bookReceived.image_url,
        subtitle: bookReceived.subtitle,
        threeActsStructureId: bookReceived.three_acts_structure_id
          ? new UniqueEntityId(bookReceived.three_acts_structure_id)
          : null,
        updatedAt: bookReceived.updated_at,
        structure: bookReceived.structure as BookStructureType,
        snowflakeStructureId: bookReceived.snowflake_structure_id
          ? new UniqueEntityId(bookReceived.snowflake_structure_id)
          : null,
        text: bookReceived.text,
      },
      new UniqueEntityId(bookReceived.id)
    );

    return book;
  }
}
