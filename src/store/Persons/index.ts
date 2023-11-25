import { Requester } from '@config/requests/requester';
import { PersonModelResponse } from '@modules/Persons/dtos/models/types';
import { useProjects } from '@store/Projects';
import { useRoutes } from '@store/Routes';
import { useUserStore } from '@store/User';
import { create } from 'zustand';

interface UpdatePersonSnowflakeProps {
  baseFunction?: string | null;
  baseObjective?: string | null;
  baseObstacle?: string | null;
  baseApprenticeship?: string | null;
  baseMotivation?: string | null;
  basePovByThisEye?: string | null;
  expansionFunction?: string | null;
  expansionObjective?: string | null;
  expansionObstacle?: string | null;
  expansionApprenticeship?: string | null;
  expansionMotivation?: string | null;
  expansionPovByThisEye?: string | null;
}

interface UsePersons {
  persons: PersonModelResponse[];
  currentPerson: PersonModelResponse | null;
  isLoading: boolean;

  createPerson: (data: any) => Promise<void>;
  createPersonWithSnowflakeStructure: (data: any) => Promise<void>;
  loadPerson: (id: string) => Promise<void>;
  loadPersons: () => Promise<void>;
  updateHistory: (history: string) => Promise<void>;
  updateSnowflake: (data: UpdatePersonSnowflakeProps) => Promise<void>;
  findPerson: (id: string) => PersonModelResponse | null;
  clearCurrentPerson: () => void;
}

const usePersons = create<UsePersons>((set, get) => {
  return {
    persons: [],
    currentPerson: null,
    isLoading: false,

    createPerson: async (data: any) => {
      const { user } = useUserStore.getState();
      const { setPathname } = useRoutes.getState();

      const response = await Requester.requester({
        access: 'create-person',
        data: {
          ...data,
          userId: user?.account.id,
        },
      });

      if (!response.error) {
        const { persons: actualPersons } = get();

        const persons = response.data.persons as PersonModelResponse[];
        set({ persons: [...actualPersons, ...persons] });

        if (response.redirector.isToRedirect) {
          const { loadProject } = useProjects.getState();

          await loadProject(persons[0].projectId);

          setPathname({
            routerParameterized: response.redirector.path,
          });
        }
      }
    },

    createPersonWithSnowflakeStructure: async (data) => {
      const { user } = useUserStore.getState();

      const response = await Requester.requester({
        access: 'create-person-with-snowflake-structure',
        data: {
          ...data,
          userId: user?.account.id,
        },
      });

      if (!response.error) {
        const { persons: actualPersons } = get();
        const { loadProject } = useProjects.getState();

        const persons = response.data.persons as PersonModelResponse[];
        set({ persons: [...actualPersons, ...persons] });

        await loadProject(persons[0].projectId);
      }
    },

    loadPerson: async (id: string) => {
      set({ isLoading: true, currentPerson: null });
      const { user } = useUserStore.getState();

      const response = await Requester.requester({
        access: 'get-person',
        data: {
          personId: id,
          userId: user?.account.id,
        },
      });

      let person: PersonModelResponse | null = null;

      if (!response.error) {
        person = response.data.person as PersonModelResponse;
      }

      set({ isLoading: false, currentPerson: person });
    },

    loadPersons: async () => {
      set({ isLoading: true, persons: [] });
      const { user } = useUserStore.getState();

      const response = await Requester.requester({
        access: 'get-persons',
        data: {
          userId: user?.account.id,
        },
      });

      if (!response.error) {
        const persons = response.data.persons as PersonModelResponse[];
        set({ persons, isLoading: false });
        return;
      }

      set({ isLoading: false });
    },

    updateHistory: async (history) => {
      const { user } = useUserStore.getState();
      const { currentPerson } = get();

      if (currentPerson) {
        const response = await Requester.requester({
          access: 'update-person-history',
          data: {
            personId: currentPerson.id,
            history,
            userId: user?.account.id,
            projectId: currentPerson.projectId,
          },
        });

        if (!response.error) {
          const updatedPerson: PersonModelResponse = {
            ...currentPerson,
            history,
          };

          set({ currentPerson: updatedPerson });
        }
      }
    },

    findPerson: (id) => {
      const { persons } = get();
      const person = persons.find((p) => p.id === id);
      return person ?? null;
    },

    clearCurrentPerson: () => {
      set({ currentPerson: null });
    },

    updateSnowflake: async (data) => {
      const { user } = useUserStore.getState();
      const { currentPerson } = get();

      if (currentPerson) {
        const response = await Requester.requester({
          access: 'update-snowflake',
          data: {
            personId: currentPerson.id,
            userId: user?.account.id,
            projectId: currentPerson.projectId,
            ...data,
          },
        });

        if (!response.error) {
          const updatedPerson = {
            ...currentPerson,
            snowflakeStructureBase: {
              ...currentPerson.snowflakeStructureBase,
              function:
                data.baseFunction ??
                currentPerson.snowflakeStructureBase?.function,
              objective:
                data.baseObjective ??
                currentPerson.snowflakeStructureBase?.objective,
              obstacle:
                data.baseObstacle ??
                currentPerson.snowflakeStructureBase?.obstacle,
              apprenticeship:
                data.baseApprenticeship ??
                currentPerson.snowflakeStructureBase?.apprenticeship,
              motivation:
                data.baseMotivation ??
                currentPerson.snowflakeStructureBase?.motivation,
              povByThisEye:
                data.basePovByThisEye ??
                currentPerson.snowflakeStructureBase?.povByThisEye,
            },
            snowflakeStructureExpansion: {
              ...currentPerson.snowflakeStructureExpansion,
              function:
                data.expansionFunction ??
                currentPerson.snowflakeStructureExpansion?.function,
              objective:
                data.expansionObjective ??
                currentPerson.snowflakeStructureExpansion?.objective,
              obstacle:
                data.expansionObstacle ??
                currentPerson.snowflakeStructureExpansion?.obstacle,
              apprenticeship:
                data.expansionApprenticeship ??
                currentPerson.snowflakeStructureExpansion?.apprenticeship,
              motivation:
                data.expansionMotivation ??
                currentPerson.snowflakeStructureExpansion?.motivation,
              povByThisEye:
                data.expansionPovByThisEye ??
                currentPerson.snowflakeStructureExpansion?.povByThisEye,
            },
          };

          set({ currentPerson: updatedPerson as PersonModelResponse });
        }
      }
    },
  };
});

export { usePersons };
