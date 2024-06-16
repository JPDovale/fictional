import { useTheme } from '@hooks/useTheme'
import { useNav } from '@hooks/useNav'
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types'
import { usePersons } from '@store/Persons'
import { useParams } from 'react-router-dom'
import { divider, pathOnHeaderStyles, projectHeaderStyles } from './styles'

interface ProjectHeaderProps {
  project?: ProjectModelResponse | null
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { bookId } = useParams()
  const { theme } = useTheme()
  const { makePathsOnHeaderProject } = useNav()
  const { currentPerson } = usePersons((state) => ({
    currentPerson: state.currentPerson,
  }))

  const pathsOnHeader = makePathsOnHeaderProject()

  return (
    <header className={projectHeaderStyles({ theme })}>
      {pathsOnHeader.map((path) => {
        if (!path) return null
        if (typeof path === 'string') {
          return (
            <div className="flex items-center gap-0.5" key={path}>
              <span className={pathOnHeaderStyles()}>{path}</span>
              <span className={divider()}>/</span>
            </div>
          )
        }

        if (path.name === ':id') {
          return (
            <div className="flex items-center gap-0.5" key={path()}>
              <span className={pathOnHeaderStyles()}>
                {project &&
                  (project[path() as keyof ProjectModelResponse] as string)}
              </span>
              <span className={divider()}>/</span>
            </div>
          )
        }

        if (path.name === ':personId') {
          return (
            <div className="flex items-center gap-0.5" key={path()}>
              <span className={pathOnHeaderStyles()}>
                {currentPerson &&
                (currentPerson.name?.firstName || currentPerson?.name?.lastName)
                  ? currentPerson.name?.fullName
                  : '????????????'}
              </span>
              <span className={divider()}>/</span>
            </div>
          )
        }

        if (path.name === ':bookId') {
          return (
            <div className="flex items-center gap-0.5" key={path()}>
              <span className={pathOnHeaderStyles()}>
                {project &&
                  project.books.find((book) => book.id === bookId)?.title}
              </span>
              <span className={divider()}>/</span>
            </div>
          )
        }

        return null
      })}
    </header>
  )
}
