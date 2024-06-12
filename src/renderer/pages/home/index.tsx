import { Button } from '@rComponents/application/Button';
import { CardProject } from '@rComponents/projects/CardProject';
import { useProjects } from '@rHooks/useProjects';
import { FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { projects, isLoading } = useProjects();

  return (
    <main className="max-w-6xl mx-auto py-4 h-full flex-col flex w-full">
      <h3 className="text-2xl font-bold font-body px-4 opacity-60">Projetos</h3>
      <section className="grid px-4 grid-cols-3 gap-8 mt-4">
        {isLoading &&
          Array.from({ length: 9 }).map((_, index) => (
            <CardProject.Skeleton key={index} />
          ))}

        {!isLoading &&
          projects.map((project) => (
            <CardProject.Root key={project.id} asChild>
              <Link
                to={`/projects/${project.id}`}
                className="hover:shadow-inFocusDark active:shadow-inFocusDark focus:shadow-inFocusDark"
              >
                <CardProject.Image
                  src={project.image.url ?? ''}
                  alt={project.image.alt}
                />
                <CardProject.BuildBlocksIcons
                  buildBlocks={project.buildBlocks}
                />
              </Link>
            </CardProject.Root>
          ))}
      </section>

      {projects.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center my-auto pb-8">
          <span className="text-2xl font-bold opacity-60">
            Você ainda não criou um projeto
          </span>
          <span className="text-sm font-bold opacity-60">
            Vamos começar agora?
          </span>

          <Button.Root size="sm" width="middle" className="mt-10" asChild>
            <Link to="/projects/new">
              <Button.Icon>
                <FilePlus />
              </Button.Icon>
              <Button.Text>Criar projeto</Button.Text>
            </Link>
          </Button.Root>
        </div>
      )}
    </main>
  );
}
