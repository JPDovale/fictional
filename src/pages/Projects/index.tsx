import { ProjectCard } from '@components/ProjectsComponents/ProjectCard';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useProjectsStore } from '@store/Projects';
import { useRoutes } from '@store/Routes';

export function ProjectsPage() {
  const { projects } = useProjectsStore((state) => ({
    projects: state.projects,
  }));
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  function navigateToProject(id: string) {
    setPathname({
      routerParameterized: RoutesAvailable.projects.id.to(id),
    });
  }

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <h1 className="text-2xl font-bold text-text600">Projetos:</h1>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={navigateToProject}
          />
        ))}
      </div>
    </div>
  );
}
