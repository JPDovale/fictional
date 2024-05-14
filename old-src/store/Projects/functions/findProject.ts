import { GetUseProjects, SetUseProjects } from '..';

export function findProject(
  set: SetUseProjects,
  get: GetUseProjects,
  id?: string | null
) {
  const { projects } = get();
  const project = projects.find((proj) => proj.id === id);

  if (project) {
    return project;
  }

  return null;
}
