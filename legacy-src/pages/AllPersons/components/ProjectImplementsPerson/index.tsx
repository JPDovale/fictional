import { PersonCard } from '@components/PersonsComponents/PersonCard'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types'
import { usePersons } from '@store/Persons'
import { useRoutes } from '@store/Routes'
import { useMemo } from 'react'

interface ProjectImplementsPersonsProps {
  project: ProjectModelResponse
}

export function ProjectImplementsPersons({
  project,
}: ProjectImplementsPersonsProps) {
  const { persons } = usePersons((state) => ({ persons: state.persons }))
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }))

  const { personsThisProject } = useMemo(() => {
    const personsInProject = persons.filter(
      (person) => person.projectId === project.id,
    )

    return { personsThisProject: personsInProject }
  }, [persons, project])

  function handleNavigateToPersons(personId: string) {
    setPathname({
      routerParameterized: RoutesAvailable.projectPerson.to(
        project!.id,
        personId,
      ),
    })
  }

  return (
    <div
      key={project.id}
      className="flex flex-col border-b border-b-purple900 border-opacity-60 mt-10 gap-4"
    >
      <div>
        <h2 className="text-2xl mb-4 font-title text-center">{project.name}</h2>
      </div>
      <div
        data-without-person={personsThisProject.length === 0}
        className="grid grid-cols-6 gap-4 items-center mb-20 data-[without-person=true]:grid-cols-1"
      >
        {personsThisProject.length !== 0 ? (
          personsThisProject.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onClick={handleNavigateToPersons}
            />
          ))
        ) : (
          <span className="text-lg opacity-50 text-center py-6 px-4">
            Nenhum personagem criado para esse projeto
          </span>
        )}
      </div>
    </div>
  )
}
