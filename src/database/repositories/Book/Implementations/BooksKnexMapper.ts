import { Book } from '@modules/Books/models/Book';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { BookFile } from '../types';

export class BooksKnexMapper {
  static toEntity(raw: BookFile): Book {
    return Book.create(
      {
        projectId: new UniqueEntityId(raw.project_id),
        title: raw.title,
        userId: new UniqueEntityId(raw.id),
        createdAt: raw.created_at,
        imageFilename: raw.image_filename,
        imageUrl: raw.image_url,
        snowflakeStructureId: raw.snowflake_structure_id
          ? new UniqueEntityId(raw.snowflake_structure_id)
          : null,
        subtitle: raw.subtitle,
        structure: raw.structure,
        text: raw.text,
        threeActsStructureId: raw.three_acts_structure_id
          ? new UniqueEntityId(raw.three_acts_structure_id)
          : null,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id)
    );
  }

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
