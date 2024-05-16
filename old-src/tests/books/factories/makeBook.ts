import { fakerPT_BR } from '@faker-js/faker'
import { Book, BookProps } from '@modules/Books/models/Book'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export function makeBook(
  override: Partial<BookProps> = {},
  id?: UniqueEntityId,
) {
  const book = Book.create(
    {
      title: fakerPT_BR.lorem.words(4),
      structure: 'three-acts',
      userId: new UniqueEntityId(),
      projectId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return book
}
