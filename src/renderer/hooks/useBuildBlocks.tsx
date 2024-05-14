import {
  BuildBlock,
  BuildBlocksJson,
} from '@modules/projects/valueObjects/BuildBlocks'
import { NoteBlank } from '@phosphor-icons/react'
import { Building, Clock, LucideIcon, Users } from 'lucide-react'
import { useMemo } from 'react'

const BuildBlocksIconsMap = {
  FOUNDATION: Building,
  PERSONS: Users,
  TIME_LINES: Clock,
} as { [k: string]: LucideIcon }

const BuildBlocksNamesMap = {
  FOUNDATION: 'Fundação',
  PERSONS: 'Personagens',
  TIME_LINES: 'Linhas de tempo',
} as { [k: string]: string }

export function useBuildBlocks(buildBlocks: BuildBlocksJson | undefined) {
  function getIcon(name: BuildBlock | string): LucideIcon {
    return BuildBlocksIconsMap[name] || NoteBlank
  }

  function getName(name: BuildBlock | string): string {
    return BuildBlocksNamesMap[name] || name
  }

  const { blocksActives } = useMemo(() => {
    const buildBlocksActives: string[] = []

    if (buildBlocks) {
      Object.entries(buildBlocks).forEach(
        ([k, v]) => v && buildBlocksActives.push(getName(k)),
      )
    }

    return { blocksActives: buildBlocksActives }
  }, [buildBlocks])

  function isBlockActive(name: BuildBlock) {
    return blocksActives.includes(getName(name))
  }

  return {
    getIcon,
    getName,
    isBlockActive,
  }
}
