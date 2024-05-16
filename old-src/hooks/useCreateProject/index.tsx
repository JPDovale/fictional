import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProjects } from '@store/Projects'
import { INewProjectFormaData, newProjectFormSchema } from './validation'

export function useCreateProject() {
  const form = useForm<INewProjectFormaData>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      name: 'Novo projeto',
      features: {
        structure: true,
      },
    },
  })

  const { createProject } = useProjects((state) => ({
    createProject: state.createProject,
  }))

  async function handleCreateProject(data: INewProjectFormaData) {
    if (data.features['multi-book'] && !data.booksCount) {
      form.setError('booksCount', {
        message: 'Esse campo é obrigatório',
      })
      return
    }

    if (data.features['multi-book'] && data.booksCount && data.booksCount < 2) {
      form.setError('booksCount', {
        message: 'O modelo de múltiplos livros deve conter pelo menos 2 livros',
      })

      return
    }

    if (
      data.features['multi-book'] &&
      data.booksCount &&
      data.booksCount > 20
    ) {
      form.setError('booksCount', {
        message: 'O modelo de múltiplos livros deve conter até 20 livros',
      })

      return
    }

    await createProject(data)
  }

  return {
    ...form,
    handleCreateProject,
  }
}
