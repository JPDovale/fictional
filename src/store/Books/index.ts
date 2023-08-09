import { BookModelResponse } from '@modules/Books/dtos/models/types';
import { PersonModelResponse } from '@modules/Persons/dtos/models/types';
import { useProjects } from '@store/Projects';
import { create } from 'zustand';

interface UseBooks {
  books: BookModelResponse[];
  currentBook: BookModelResponse | null;
  isLoading: boolean;

  loadBook: (id: string) => Promise<void>;
  clearCurrentBook: () => void;
  findBook: (bookId: string) => BookModelResponse | null;
  addPersonInBook: (bookId: string, person: PersonModelResponse) => void;
  setBook: (book: BookModelResponse) => void;
}

const useBooks = create<UseBooks>((set, get) => {
  return {
    books: [],
    currentBook: null,
    isLoading: false,

    loadBook: async (id) => {
      set({ isLoading: false, currentBook: null });

      const { currentProject } = useProjects.getState();
      if (!currentProject) return;

      const book = currentProject.books.find((b) => b.id === id);

      set({ currentBook: book ?? null, isLoading: false });
    },

    addPersonInBook: (bookId, person) => {
      const { books } = get();
      const book = books.find((b) => b.id === bookId);

      book?.snowflakeStructure?.persons.push(person);
    },

    findBook: (bookId) => {
      const { books } = get();
      return books.find((b) => b.id === bookId) ?? null;
    },

    clearCurrentBook: () => {
      set({ currentBook: null });
    },

    setBook: (book) => {
      const { books, currentBook } = get();
      const updatedBooks = books;

      const indexToSet = books.findIndex((b) => b.id === book.id);
      updatedBooks[indexToSet] = book;

      if (currentBook?.id === book.id) {
        set({ currentBook: book });
      }

      set({ books: updatedBooks });
    },
  };
});

export { useBooks };
