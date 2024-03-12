import {
  BuildBlock,
  BuildBlocksJson,
} from '@modules/projects/valueObjects/BuildBlocks'
import { Buildings, Clock, NoteBlank, Users } from '@phosphor-icons/react'
import { NavigationLink } from '@rComponents/application/Navigation'
import { LucideIcon } from 'lucide-react'

const BuildBlocksIconsMap = {
  FOUNDATION: Buildings,
  PERSONS: Users,
  TIME_LINES: Clock,
} as { [k: string]: LucideIcon }

const BuildBlocksNamesMap = {
  FOUNDATION: 'Fundação',
  PERSONS: 'Personagens',
  TIME_LINES: 'Linhas de tempo',
} as { [k: string]: string }

export function useBuildBlocks() {
  function getIcon(name: BuildBlock | string): LucideIcon {
    return BuildBlocksIconsMap[name] || NoteBlank
  }

  function getName(name: BuildBlock | string): string {
    return BuildBlocksNamesMap[name] || name
  }

  function filterAvailableNavLinksBasedInBuildBlocks(
    navLinks: NavigationLink[],
    buildBlocks: BuildBlocksJson,
  ) {
    const inactiveBuildBlocks = Object.entries(buildBlocks).filter(
      ([, v]) => !v,
    )

    if (inactiveBuildBlocks.length === 0) return navLinks

    const inactiveBuildBlockNames = inactiveBuildBlocks.map(
      ([k]) => BuildBlocksNamesMap[k] || k,
    )

    return navLinks.filter((navLink) => {
      return !inactiveBuildBlockNames.includes(navLink.label)
    })
  }

  return {
    getIcon,
    getName,
    filterAvailableNavLinksBasedInBuildBlocks,
  }
}
