import { INewProjectFormaData } from '@hooks/useCreateProject/validation'
import { useUserStore } from '@store/User'
import { useRoutes } from '@store/Routes'
import { Requester } from '@config/requests/requester'
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types'
import { GetUseProjects, SetUseProjects } from '..'

export async function createProject(
  set: SetUseProjects,
  get: GetUseProjects,
  data: INewProjectFormaData,
) {
  const { user } = useUserStore.getState()
  const { setPathname } = useRoutes.getState()

  const response = await Requester.requester({
    access: 'create-project',
    data: { ...data, userId: user?.account.id },
  })

  if (!response.error) {
    const { projects: actualProjects } = get()

    const projects = response.data.projects as ProjectModelResponse[]
    set({ projects: [...projects, ...actualProjects] })

    if (response.redirector.isToRedirect) {
      setPathname({
        routerParameterized: response.redirector.path,
      })
    }
  }
}
