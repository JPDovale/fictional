import { useProjects } from '@store/Projects';
import { useMemo } from 'react';
import { ProjectImplementsPersons } from './components/ProjectImplementsPerson';

export function AllPersonsPage() {
  const { projects } = useProjects((state) => ({ projects: state.projects }));

  const { projectsImplementsPersons } = useMemo(() => {
    const projectsImplementsFeaturePersons = projects.filter(
      (project) => project.features.person
    );

    return { projectsImplementsPersons: projectsImplementsFeaturePersons };
  }, [projects]);

  return (
    <main className="flex-1 p-6 overflow-hidden">
      <h1 className="text-2xl font-bold text-text600">Personagens:</h1>

      <div className="mt-4 flex flex-col gap-6">
        {projectsImplementsPersons.map((project) => (
          <ProjectImplementsPersons key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
