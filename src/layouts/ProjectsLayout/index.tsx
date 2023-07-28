import { Loading } from '@components/Loading';
import { ProjectHeader } from '@components/ProjectsComponents/ProjectHeader';
import { useProjectsStore } from '@store/Projects';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export function ProjectsLayout() {
  const { id } = useParams();
  const { loadProject, currentProject, isLoading } = useProjectsStore(
    (state) => ({
      loadProject: state.loadProject,
      currentProject: state.currentProject,
      isLoading: state.isLoading,
    })
  );

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id, loadProject]);

  if (isLoading || !currentProject) return <Loading />;

  return (
    <div className="flex-1">
      <ProjectHeader project={currentProject} />
      <Outlet />
    </div>
  );
}
