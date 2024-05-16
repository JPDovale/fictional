import { useBooks } from '@store/Books'
import { BookModelResponse } from '@modules/Books/dtos/models/types'
import { SnowflakeStructureModelResponse } from '@modules/SnowflakeStructures/dtos/models/types'
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types'
import { GetUseProjects, SetUseProjects } from '..'

export interface SetSnowflakeStructureProps {
  centralIdia?: string | null
  phrase1?: string | null
  phrase2?: string | null
  phrase3?: string | null
  phrase4?: string | null
  phrase5?: string | null
  paragraph1?: string | null
  paragraph2?: string | null
  paragraph3?: string | null
  paragraph4?: string | null
  paragraph5?: string | null
  projectId: string
  bookId: string
}

export function setSnowflakeStructure(
  set: SetUseProjects,
  get: GetUseProjects,
  props: SetSnowflakeStructureProps,
) {
  const { currentProject: project } = get()
  const { setBook } = useBooks.getState()

  if (!project) throw new Error('Project inexistent')

  const bookToUpdate = project.books.find((b) => b.id === props.bookId)
  const indexBookToUpdate = project.books.findIndex(
    (book) => book.id === props.bookId,
  )
  if (!bookToUpdate) throw new Error('Book inexistent')

  const updatedBook = makeUpdatedBook(bookToUpdate, props)
  const updatedBooks = [...project.books]
  updatedBooks[indexBookToUpdate] = updatedBook

  const updatedProject: ProjectModelResponse = {
    ...project,
    books: updatedBooks,
  }

  setBook(updatedBook)
  set({ currentProject: updatedProject })
}

function makeUpdatedBook(
  bookToUpdate: BookModelResponse,
  props: SetSnowflakeStructureProps,
) {
  const updatedBook: BookModelResponse = {
    ...bookToUpdate!,
    snowflakeStructure: {
      ...bookToUpdate?.snowflakeStructure,
      centralIdia:
        props.centralIdia ?? bookToUpdate?.snowflakeStructure?.centralIdia,
      expansionToParagraph: {
        phrase1:
          props.phrase1 ??
          bookToUpdate?.snowflakeStructure?.expansionToParagraph?.phrase1,
        phrase2:
          props.phrase2 ??
          bookToUpdate?.snowflakeStructure?.expansionToParagraph?.phrase2,
        phrase3:
          props.phrase3 ??
          bookToUpdate?.snowflakeStructure?.expansionToParagraph?.phrase3,
        phrase4:
          props.phrase4 ??
          bookToUpdate?.snowflakeStructure?.expansionToParagraph?.phrase4,
        phrase5:
          props.phrase5 ??
          bookToUpdate?.snowflakeStructure?.expansionToParagraph?.phrase5,
      },
      expansionToPage: {
        paragraph1:
          props.paragraph1 ??
          bookToUpdate?.snowflakeStructure?.expansionToPage?.paragraph1,
        paragraph2:
          props.paragraph2 ??
          bookToUpdate?.snowflakeStructure?.expansionToPage?.paragraph2,
        paragraph3:
          props.paragraph3 ??
          bookToUpdate?.snowflakeStructure?.expansionToPage?.paragraph3,
        paragraph4:
          props.paragraph4 ??
          bookToUpdate?.snowflakeStructure?.expansionToPage?.paragraph4,
        paragraph5:
          props.paragraph5 ??
          bookToUpdate?.snowflakeStructure?.expansionToPage?.paragraph5,
      },
      id: bookToUpdate!.snowflakeStructure!.id,
    } as SnowflakeStructureModelResponse,
  }

  return updatedBook
}
