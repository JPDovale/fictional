import { Project } from '@modules/Projects/models/Project';
import { PersonParser } from '@modules/Persons/dtos/models/Parsers/Person';
import { BookParser } from '@modules/Books/dtos/models/Parsers/Book';
import { ProjectModelResponse } from '../types';

export function ProjectParser(project: Project): ProjectModelResponse {
  const projectPartied: ProjectModelResponse = {
    id: project.id.toString(),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    features: project.features.toValue(),
    name: project.name,
    type: project.type,
    structure: project.structure,
    users: [],
    image: {
      alt: project.name,
      url: project.imageUrl ?? null,
    },
    creator: project.creator
      ? {
          id: project.creator.id.toString(),
          email: project.creator.email,
          permission: project.creator.permission,
          username: project.creator.username,
          avatar: {
            alt: project.creator.username,
            url: project.creator?.avatarUrl ?? null,
          },
        }
      : null,
    books: project.books.currentItems.map((book) => BookParser(book)),
    persons: project.persons.currentItems.map((person) => PersonParser(person)),
  };

  return projectPartied;
}
