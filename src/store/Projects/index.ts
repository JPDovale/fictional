import { Requester } from '@config/requests/requester';
import { INewProjectFormaData } from '@hooks/useCreateProject/validation';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { useRoutes } from '@store/Routes';
import { useUserStore } from '@store/User';
import { create } from 'zustand';

interface UpdateThreeActsStructureProps {
  act1?: string | null;
  act2?: string | null;
  act3?: string | null;
}

interface UseProjectsStore {
  projects: ProjectModelResponse[];
  currentProject: ProjectModelResponse | null;
  isLoading: boolean;

  loadProjects: () => Promise<void>;
  createProject: (data: INewProjectFormaData) => Promise<void>;
  findProject: (id: string | null | undefined) => ProjectModelResponse | null;
  loadProject: (id: string) => Promise<void>;
  updateThreeActsStructure: (
    props: UpdateThreeActsStructureProps
  ) => Promise<void>;
}

const useProjectsStore = create<UseProjectsStore>((set, get) => {
  return {
    projects: [],
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

      const response = await Requester.requester({
        access: 'get-project',
        data: {
          userId: user?.account.id,
          projectId: id,
        },
      });

      if (!response.error) {
        const project = response.data.project as ProjectModelResponse;
        set({ currentProject: project });
      }

      set({
        isLoading: false,
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
          const updatedProject: ProjectModelResponse = {
            ...currentProject,
            threeActsStructure: {
              id: currentProject.threeActsStructure?.id ?? '',
              act1: currentProject.threeActsStructure?.act1 ?? '',
              act2: currentProject.threeActsStructure?.act2 ?? '',
              act3: currentProject.threeActsStructure?.act3 ?? '',
              ...props,
            },
          };

          set({ currentProject: updatedProject });
        }
      }
    },
  };
});

export { useProjectsStore };
