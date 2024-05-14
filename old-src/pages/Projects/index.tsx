import { ProjectCard } from '@components/ProjectsComponents/ProjectCard';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useProjects } from '@store/Projects';
import { useRoutes } from '@store/Routes';

export function ProjectsPage() {
  const { projects } = useProjects((state) => ({
    projects: state.projects,
  }));
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  function navigateToProject(id: string) {
    setPathname({
      routerParameterized: RoutesAvailable.project.to(id),
    });
  }

  return (
    <main className="flex-1 p-6 overflow-hidden">
      <h1 className="text-2xl font-bold text-text600">Projetos:</h1>

      <div className="grid grid-cols-4 gap-6 mt-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={navigateToProject}
          />
        ))}
      </div>
    </main>
  );
}
