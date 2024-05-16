import { useUserStore } from '@store/User'
import { Requester } from '@config/requests/requester'
import { BookModelResponse } from '@modules/Books/dtos/models/types'
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types'
import { GetUseProjects, SetUseProjects } from '..'

export interface UpdateThreeActsStructureProps {
  act1?: string | null
  act2?: string | null
  act3?: string | null
  bookId: string
}

export async function updateThreeActsStructure(
  set: SetUseProjects,
  get: GetUseProjects,
  props: UpdateThreeActsStructureProps,
) {
  const { user } = useUserStore.getState()
  const { currentProject } = get()

  if (currentProject) {
    const response = await Requester.requester({
      access: 'update-three-acts-structure',
      data: {
        userId: user?.account.id,
        projectId: currentProject.id,
        ...props,
      },
    })

    if (!response.error) {
      const bookToUpdate = currentProject.books.find(
        (book) => book.id === props.bookId,
      )
      const indexBookToUpdate = currentProject.books.findIndex(
        (book) => book.id === props.bookId,
      )
      const updatedBook: BookModelResponse = {
        ...bookToUpdate!,
        threeActsStructure: {
          act1: props.act1 ?? null,
          act2: props.act2 ?? null,
          act3: props.act3 ?? null,
          id: bookToUpdate!.threeActsStructure!.id,
        },
      }

      const updatedBooks = [...currentProject.books]
      updatedBooks[indexBookToUpdate] = updatedBook

      const updatedProject: ProjectModelResponse = {
        ...currentProject,
        books: updatedBooks,
      }

      set({ currentProject: updatedProject })
    }
  }
}
