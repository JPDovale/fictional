import { NodeTree } from '@rComponents/application/FolderTree'
import { Folder, Settings, UserPlus } from 'lucide-react'
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks'
import { makeFoundationFolderTreeNode } from '@rConfigs/projectFolderTree/foundation'
import { useMemo } from 'react'
import { PersonType } from '@modules/persons/entities/types'
import { makeTypePersonsFolderTreeNode } from '@rConfigs/projectFolderTree/persons'
import { useProject } from './useProject'
import { useBuildBlocks } from './useBuildBlocks'

interface UseProjectTreeFolderProps {
  projectId: string
}

export function useProjectTreeFolder({ projectId }: UseProjectTreeFolderProps) {
  const { project, usePersons, usePersonsAttributes } = useProject({
    projectId,
  })
  const { persons, createAttributeForPerson } = usePersons()
  const { getName, getIcon, isBlockActive } = useBuildBlocks(
    project?.buildBlocks,
  )

  const { attributes } = usePersonsAttributes()

  const personsGroups = useMemo(() => {
    const protas = persons.filter((p) => p.type === PersonType.PROTAGONIST)
    const supportings = persons.filter((p) => p.type === PersonType.SUPPORTING)
    const antagonists = persons.filter((p) => p.type === PersonType.ANTAGONIST)
    const secondaries = persons.filter((p) => p.type === PersonType.SECONDARY)
    const adversaries = persons.filter((p) => p.type === PersonType.ADVERSARY)
    const symbolics = persons.filter((p) => p.type === PersonType.SYMBOLIC)
    const mentors = persons.filter((p) => p.type === PersonType.MENTOR)
    const extras = persons.filter((p) => p.type === PersonType.EXTRA)
    const comics = persons.filter((p) => p.type === PersonType.COMIC)

    return {
      [PersonType.PROTAGONIST]: protas,
      [PersonType.SUPPORTING]: supportings,
      [PersonType.ANTAGONIST]: antagonists,
      [PersonType.SECONDARY]: secondaries,
      [PersonType.ADVERSARY]: adversaries,
      [PersonType.SYMBOLIC]: symbolics,
      [PersonType.MENTOR]: mentors,
      [PersonType.EXTRA]: extras,
      [PersonType.COMIC]: comics,
    }
  }, [persons])

  const homeNode: NodeTree = {
    id: '3',
    icon: Folder,
    name: 'Inicio',
    path: `/projects/${projectId}`,
  }

  const foundationNode = makeFoundationFolderTreeNode({
    projectId,
    icon: getIcon(BuildBlock.FOUNDATION),
    name: getName(BuildBlock.FOUNDATION),
    isToShow: isBlockActive(BuildBlock.FOUNDATION),
  })

  const childs = Object.entries(personsGroups).map(([key, value]) => {
    return makeTypePersonsFolderTreeNode({
      persons: value,
      projectId,
      personsType: key as PersonType,
      createAttributeForPerson,
      attributes,
    })
  })

  const personsNode: NodeTree = {
    id: '5',
    path: `/projects/${projectId}/persons/new`,
    isToShow: isBlockActive(BuildBlock.PERSONS),
    icon: getIcon(BuildBlock.PERSONS),
    name: getName(BuildBlock.PERSONS),
    actions: [
      {
        label: 'Novo personagem',
        action: () => `/projects/${projectId}/persons/new`,
        Icon: UserPlus,
      },
    ],
    childs,
  }

  const timeLinesNode: NodeTree = {
    id: '6',
    path: `/projects/${projectId}/time-lines`,
    icon: getIcon(BuildBlock.TIME_LINES),
    isToShow: isBlockActive(BuildBlock.TIME_LINES),
    name: getName(BuildBlock.TIME_LINES),
  }

  const settingsNode: NodeTree = {
    id: '7',
    path: `/projects/${projectId}/config`,
    icon: Settings,
    name: 'Configurações',
  }

  return {
    closed: false,
    id: '2',
    icon: Folder,
    name: 'Projeto',
    childs: [
      homeNode,
      foundationNode,
      personsNode,
      timeLinesNode,
      settingsNode,
    ],
  }
}
