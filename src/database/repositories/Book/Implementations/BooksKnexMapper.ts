import { Book } from '@modules/Books/models/Book';
import { BookFile } from '../types';

export class BooksKnexMapper {
  static toEntity() {}

  static toKnex(book: Book): BookFile {
    return {
      id: book.id.toString(),
      title: book.title,
      subtitle: book.subtitle,
      text: book.text,
      image_url: book.imageUrl,
      image_filename: book.imageFilename,
      structure: book.structure,
      project_id: book.projectId.toString(),
      user_id: book.userId.toString(),
      snowflake_structure_id: book.snowflakeStructureId
        ? book.snowflakeStructureId.toString()
        : null,
      three_acts_structure_id: book.threeActsStructureId
        ? book.threeActsStructureId.toString()
        : null,
      created_at: book.createdAt,
      updated_at: book.updatedAt,
    };
  }
}
