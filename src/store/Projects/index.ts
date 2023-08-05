import { Requester } from '@config/requests/requester';
import { INewProjectFormaData } from '@hooks/useCreateProject/validation';
import { BookModelResponse } from '@modules/Books/dtos/models/types';
import { PersonModelResponse } from '@modules/Persons/dtos/models/types';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { SnowflakeStructureModelResponse } from '@modules/SnowflakeStructures/dtos/models/types';
import { useBooks } from '@store/Books';
import { usePersons } from '@store/Persons';
import { useRoutes } from '@store/Routes';
import { useUserStore } from '@store/User';
import { create } from 'zustand';

interface UpdateThreeActsStructureProps {
  act1?: string | null;
  act2?: string | null;
  act3?: string | null;
  bookId: string;
}

interface UpdateSnowflakeStructureProps {
  centralIdia?: string | null;
  phrase1?: string | null;
  phrase2?: string | null;
  phrase3?: string | null;
  phrase4?: string | null;
  phrase5?: string | null;
  bookId: string;
}

interface UseProjects {
  projects: ProjectModelResponse[];
  persons: PersonModelResponse[];
  currentProject: ProjectModelResponse | null;
  isLoading: boolean;

  loadProjects: () => Promise<void>;
  createProject: (data: INewProjectFormaData) => Promise<void>;
  findProject: (id: string | null | undefined) => ProjectModelResponse | null;
  loadProject: (id: string) => Promise<void>;
  updateThreeActsStructure: (
    props: UpdateThreeActsStructureProps
  ) => Promise<void>;
  updateSnowflakeStructure: (
    props: UpdateSnowflakeStructureProps
  ) => Promise<void>;
}

const useProjects = create<UseProjects>((set, get) => {
  return {
    projects: [],
    persons: [],
    currentProject: null,
    isLoading: true,

    loadProjects: async () => {
      const { user } = useUserStore.getState();

      const response = await Requester.requester({
        access: 'get-projects',
        data: {
          userId: user?.account.id,
        },
      });

      if (!response.error) {
        const projects = response.data.projects as ProjectModelResponse[];
        set({ projects });
        return;
      }

      set({
        isLoading: false,
      });
    },

    createProject: async (data) => {
      const { user } = useUserStore.getState();
      const { setPathname } = useRoutes.getState();

      const response = await Requester.requester({
        access: 'create-project',
        data: { ...data, userId: user?.account.id },
      });

      if (!response.error) {
        const { projects: actualProjects } = get();

        const projects = response.data.projects as ProjectModelResponse[];
        set({ projects: [...projects, ...actualProjects] });

        if (response.redirector.isToRedirect) {
          setPathname({
            routerParameterized: response.redirector.path,
          });
        }
      }
    },

    findProject: (id) => {
      const { projects } = get();
      const project = projects.find((proj) => proj.id === id);

      if (project) {
        return project;
      }

      return null;
    },

    loadProject: async (id) => {
      set({ isLoading: true, currentProject: null });
      const { user } = useUserStore.getState();
      const { clearCurrentPerson } = usePersons.getState();
      const { clearCurrentBook } = useBooks.getState();

      clearCurrentBook();
      clearCurrentPerson();
      const response = await Requester.requester({
        access: 'get-project',
        data: {
          userId: user?.account.id,
          projectId: id,
        },
      });

      let project: ProjectModelResponse | null = null;
      const persons: PersonModelResponse[] = [];

      if (!response.error) {
        project = response.data.project as ProjectModelResponse;
      }

      set({
        isLoading: false,
        currentProject: project,
        persons,
      });
    },

    updateThreeActsStructure: async (props) => {
      const { user } = useUserStore.getState();
      const { currentProject } = get();

      if (currentProject) {
        const response = await Requester.requester({
          access: 'update-three-acts-structure',
          data: {
            userId: user?.account.id,
            projectId: currentProject.id,
            ...props,
          },
        });

        if (!response.error) {
          const bookToUpdate = currentProject.books.find(
            (book) => book.id === props.bookId
          );
          const indexBookToUpdate = currentProject.books.findIndex(
            (book) => book.id === props.bookId
          );
          const updatedBook: BookModelResponse = {
            ...bookToUpdate!,
            threeActsStructure: {
              act1: props.act1 ?? null,
              act2: props.act2 ?? null,
              act3: props.act3 ?? null,
              id: bookToUpdate!.threeActsStructure!.id,
            },
          };

          const updatedBooks = [...currentProject.books];
          updatedBooks[indexBookToUpdate] = updatedBook;

          const updatedProject: ProjectModelResponse = {
            ...currentProject,
            books: updatedBooks,
          };

          set({ currentProject: updatedProject });
        }
      }
    },

    updateSnowflakeStructure: async (props) => {
      const { user } = useUserStore.getState();
      const { currentProject } = get();

      if (currentProject) {
        const response = await Requester.requester({
          access: 'update-snowflake-structure',
          data: {
            userId: user?.account.id,
            projectId: currentProject.id,
            ...props,
          },
        });

        if (!response.error) {
          const bookToUpdate = currentProject.books.find(
            (book) => book.id === props.bookId
          );
          const indexBookToUpdate = currentProject.books.findIndex(
            (book) => book.id === props.bookId
          );
          const updatedBook: BookModelResponse = {
            ...bookToUpdate!,
            snowflakeStructure: {
              ...bookToUpdate?.snowflakeStructure,
              centralIdia:
                props.centralIdia ??
                bookToUpdate?.snowflakeStructure?.centralIdia,
              expansionToParagraph: {
                phrase1:
                  props.phrase1 ??
                  bookToUpdate?.snowflakeStructure?.expansionToParagraph
                    ?.phrase1,
                phrase2:
                  props.phrase2 ??
                  bookToUpdate?.snowflakeStructure?.expansionToParagraph
                    ?.phrase2,
                phrase3:
                  props.phrase3 ??
                  bookToUpdate?.snowflakeStructure?.expansionToParagraph
                    ?.phrase3,
                phrase4:
                  props.phrase4 ??
                  bookToUpdate?.snowflakeStructure?.expansionToParagraph
                    ?.phrase4,
              },
              id: bookToUpdate!.snowflakeStructure!.id,
            } as SnowflakeStructureModelResponse,
          };

          const updatedBooks = [...currentProject.books];
          updatedBooks[indexBookToUpdate] = updatedBook;

          const updatedProject: ProjectModelResponse = {
            ...currentProject,
            books: updatedBooks,
          };

          set({ currentProject: updatedProject });
        }
      }
    },
  };
});

export { useProjects };
