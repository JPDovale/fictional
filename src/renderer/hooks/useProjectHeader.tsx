import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { z } from 'zod'
import {
  ProjectPageHeader,
  ProjectPageHeaderProps,
} from '@rComponents/projects/ProjectPageHeader'
import { Optional } from '@shared/core/types/Optional'
import { useProject } from './useProject'

export function useProjectHeader() {
  const [paths, setPaths] = useState<string[]>([])
  const [projectId, setProjectId] = useState<string>('')
  const { project } = useProject({ projectId })

  const { pathname } = useLocation()

  useEffect(() => {
    const pathsMapper: { [x: string]: string } = {
      projects: 'Projeto',
      foundation: 'Fundação',
      persons: 'Personagens',
      'time-lines': 'Linhas de tempo',
      config: 'Configurações',
    }

    const uuidsPathsMapper: { [x: string]: string } = {
      projects: project?.name ?? '',
    }

    function makePath(rawPath: string, rawPaths: string[], index: number) {
      const path = pathsMapper[rawPath] ?? rawPath

      const isUUIDSchema = z.string().uuid()
      const isUUID = isUUIDSchema.safeParse(rawPath).success

      if (!isUUID) return path

      const previousRawPath = rawPaths[index - 1]
      const pathMapped = uuidsPathsMapper[previousRawPath] ?? ''

      if (previousRawPath === 'projects') {
        setProjectId(rawPath)
      }

      return pathMapped
    }

    const rawPaths = pathname.split('/').slice(1)
    const mappedPaths = rawPaths.map((rawPath, index) =>
      makePath(rawPath, rawPaths, index),
    )

    setPaths(mappedPaths)
  }, [pathname, project?.name])

  return {
    paths,
    Header: ({ ...props }: Optional<ProjectPageHeaderProps, 'projectId'>) => (
      <ProjectPageHeader projectId={projectId} {...props} />
    ),
  }
}
