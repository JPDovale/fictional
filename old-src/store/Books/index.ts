import { Requester } from '@config/requests/requester'
import { BookModelResponse } from '@modules/Books/dtos/models/types'
import { PersonModelResponse } from '@modules/Persons/dtos/models/types'
import { useProjects } from '@store/Projects'
import { useUserStore } from '@store/User'
import { create } from 'zustand'

interface UseBooks {
  books: BookModelResponse[]
  currentBook: BookModelResponse | null
  isLoading: boolean

  loadBook: (id: string) => Promise<void>
  clearCurrentBook: () => void
  findBook: (bookId: string) => BookModelResponse | null
  addPersonInBook: (bookId: string, person: PersonModelResponse) => void
  setBook: (book: BookModelResponse) => void
  updateText: (text: string) => Promise<void>
}

const useBooks = create<UseBooks>((set, get) => {
  return {
    books: [],
    currentBook: null,
    isLoading: false,

    loadBook: async (id) => {
      set({ isLoading: true, currentBook: null })

      const { currentProject } = useProjects.getState()
      if (!currentProject) return

      const book = currentProject.books.find((b) => b.id === id)

      set({
        currentBook: book ?? currentProject.books[0] ?? null,
        isLoading: false,
      })
    },

    addPersonInBook: (bookId, person) => {
      const { books } = get()
      const book = books.find((b) => b.id === bookId)

      book?.snowflakeStructure?.persons.push(person)
    },

    findBook: (bookId) => {
      const { books } = get()
      return books.find((b) => b.id === bookId) ?? null
    },

    clearCurrentBook: () => {
      set({ currentBook: null })
    },

    setBook: (book) => {
      const { books, currentBook } = get()
      const updatedBooks = books

      const indexToSet = books.findIndex((b) => b.id === book.id)
      updatedBooks[indexToSet] = book

      if (currentBook?.id === book.id) {
        set({ currentBook: book })
      }

      set({ books: updatedBooks })
    },

    updateText: async (text) => {
      const { user } = useUserStore.getState()
      const { currentBook } = get()

      if (currentBook) {
        const response = await Requester.requester({
          access: 'update-book-text',
          data: {
            bookId: currentBook.id,
            text,
            userId: user?.account.id,
            projectId: currentBook.projectId,
          },
        })

        if (!response.error) {
          const updatedBook: BookModelResponse = {
            ...currentBook,
            text,
          }

          set({ currentBook: updatedBook })
        }
      }
    },
  }
})

export { useBooks }
