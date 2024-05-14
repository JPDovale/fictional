import { INewProjectFormaData } from '@hooks/useCreateProject/validation';
import { PersonModelResponse } from '@modules/Persons/dtos/models/types';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { create } from 'zustand';
import { loadProjects } from './functions/loadProjects';
import { createProject } from './functions/createProject';
import { findProject } from './functions/findProject';
import { loadProject } from './functions/loadProject';
import {
  UpdateThreeActsStructureProps,
  updateThreeActsStructure,
} from './functions/updateThreeActsStructure';
import {
  UpdateSnowflakeStructureProps,
  updateSnowflakeStructure,
} from './functions/updateSnowflakeStructure';
import {
  SetSnowflakeStructureProps,
  setSnowflakeStructure,
} from './functions/setSnowflakeStructure';

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
  setSnowflakeStructure: (props: SetSnowflakeStructureProps) => void;
}

export type SetUseProjects = (
  partial:
    | UseProjects
    | Partial<UseProjects>
    | ((state: UseProjects) => UseProjects | Partial<UseProjects>),
  replace?: boolean | undefined
) => void;
export type GetUseProjects = () => UseProjects;

const useProjects = create<UseProjects>((set, get) => {
  return {
    projects: [],
    persons: [],
    currentProject: null,
    isLoading: true,

    loadProjects: () => loadProjects(set),
    createProject: (data) => createProject(set, get, data),
    findProject: (id) => findProject(set, get, id),
    loadProject: (id) => loadProject(set, get, id),
    updateThreeActsStructure: (props) =>
      updateThreeActsStructure(set, get, props),
    updateSnowflakeStructure: (props) =>
      updateSnowflakeStructure(set, get, props),
    setSnowflakeStructure: (props) => setSnowflakeStructure(set, get, props),
  };
});

export { useProjects };
