import { Book } from '@modules/Books/models/Book';
import { ThreeActsStructureParser } from '@modules/ThreeActsStructures/dtos/models/Parsers/ThreeActsStructure';
import { SnowflakeStructureParser } from '@modules/SnowflakeStructures/dtos/models/Parsers/SnowflakeStructureParser';
import { BookModelResponse } from '../types';

export function BookParser(book: Book): BookModelResponse {
  const bookPartied: BookModelResponse = {
    createdAt: book.createdAt,
    id: book.id.toString(),
    structure: book.structure,
    subtitle: book.subtitle,
    title: book.title,
    updatedAt: book.updatedAt,
    userId: book.userId.toString(),
    text: book.text,
    image: {
      alt: book.title,
      url: book.imageUrl,
    },
    projectId: book.projectId.toString(),
    threeActsStructure: book.threeActsStructure
      ? ThreeActsStructureParser(book.threeActsStructure)
      : null,
    snowflakeStructure: book.snowflakeStructure
      ? SnowflakeStructureParser(book.snowflakeStructure)
      : null,
  };

  return bookPartied;
}
