import { CardProject } from '@rComponents/projects/CardProject'
import { useProjects } from '@rHooks/useProjects'
import { Link } from 'react-router-dom'

export function HomePage() {
  const { projects } = useProjects()
  return (
    <main className="max-w-6xl mx-auto py-4 h-full flex-col flex w-full">
      <h3 className="text-2xl font-bold font-body px-4 opacity-60">Projetos</h3>

      <section className="grid px-4 grid-cols-3 gap-8 mt-4">
        {projects.map((project) => (
          <CardProject.Root key={project.id} asChild>
            <Link
              to={`/projects/${project.id}`}
              className="hover:shadow-inFocusDark active:shadow-inFocusDark focus:shadow-inFocusDark"
            >
              <CardProject.Image
                src={project.image.url ?? ''}
                alt={project.image.alt}
              />
              <CardProject.BuildBlocksIcons buildBlocks={project.buildBlocks} />
            </Link>
          </CardProject.Root>
        ))}
      </section>
    </main>
  )
}
