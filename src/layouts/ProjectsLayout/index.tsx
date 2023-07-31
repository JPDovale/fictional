import { Loading } from '@components/Loading';
import { ProjectHeader } from '@components/ProjectsComponents/ProjectHeader';
import { ProjectNavigation } from '@components/ProjectsComponents/ProjectNavigation';
import { useTheme } from '@hooks/useTheme';
import { useProjects } from '@store/Projects';
import { mainStyles } from '@styles/theme';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useNav } from '@hooks/useNav';
import { usePersons } from '@store/Persons';
import { overlayImageStyles } from './styles';

export function ProjectsLayout() {
  const { theme } = useTheme();
  const { id, personId } = useParams();
  const { loadProject, currentProject, isLoading } = useProjects((state) => ({
    loadProject: state.loadProject,
    currentProject: state.currentProject,
    isLoading: state.isLoading,
  }));
  const { loadPerson, currentPerson, isLoadingPerson } = usePersons(
    (state) => ({
      loadPerson: state.loadPerson,
      currentPerson: state.currentPerson,
      isLoadingPerson: state.isLoading,
    })
  );
  const { makePathsOnHeaderProject } = useNav();
  const pathsOnHeaderProject = makePathsOnHeaderProject();

  useEffect(() => {
    if (id && id !== currentProject?.id) {
      loadProject(id);
    }

    if (personId && personId !== currentPerson?.id) {
      loadPerson(personId);
    }
  }, [id, personId, loadProject, loadPerson, currentPerson, currentProject]);

  if (isLoading || isLoadingPerson || !currentProject) return <Loading />;

  return (
    <div
      className={`max-w-screen w-screen max-h-screen h-screen overflow-hidden flex ${mainStyles(
        {
          theme,
        }
      )}`}
    >
      <ProjectNavigation />
      <div className="flex-1 max-h-screen overflow-x-hidden overflow-y-scroll">
        <div className="flex-1">
          <ProjectHeader project={currentProject} />
          {currentProject?.image.url && (
            <div className="w-full mt-8 max-h-[38rem] min-h-[38rem] relative flex items-center overflow-hidden z-0">
              <img
                className="w-full h-full object-cover"
                src={currentProject.image.url}
                alt={currentProject.image.alt}
              />
              <div className={overlayImageStyles({ theme })} />
            </div>
          )}

          <div
            data-has-image={!!currentProject?.image.url}
            data-without-title={pathsOnHeaderProject.length !== 2}
            className="relative pt-16 data-[has-image=true]:pt-0 data-[has-image=true]:-mt-64 z-10 w-full flex flex-col pb-40"
          >
            {pathsOnHeaderProject.length === 2 && (
              <h1 className="text-5xl text-center font-title min-w-[45rem] mx-auto max-w-[45rem] font-bold text-text600">
                {currentProject?.name}
              </h1>
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
