import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProjectsStore } from '@store/Projects';
import { INewProjectFormaData, newProjectFormSchema } from './validation';

export function useCreateProject() {
  const form = useForm<INewProjectFormaData>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      name: 'Novo projeto',
      features: {
        structure: true,
      },
    },
  });

  const { createProject } = useProjectsStore((state) => ({
    createProject: state.createProject,
  }));

  async function handleCreateProject(data: INewProjectFormaData) {
    await createProject(data);
  }

  return {
    ...form,
    handleCreateProject,
  };
}
