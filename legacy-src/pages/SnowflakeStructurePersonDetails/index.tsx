import * as Avatar from '@radix-ui/react-avatar'

import { PersonCard } from '@components/PersonsComponents/PersonCard'
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation'
import { useBooks } from '@store/Books'
import { useProjects } from '@store/Projects'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { useRoutes } from '@store/Routes'
import { usePersons } from '@store/Persons'
import { VenetianMask } from 'lucide-react'

export function SnowflakeStructurePersonDetailsPage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }))

  const { person, isLoading, updateSnowflake } = usePersons((state) => ({
    person: state.currentPerson,
    isLoading: state.isLoading,
    updateSnowflake: state.updateSnowflake,
  }))

  return (
    <main className="flex flex-col py-4 min-w-[45rem] items-center mx-auto max-w-[45rem]">
      <Avatar.Root className="bg-transparent max-w-[16rem] min-w-[16rem] max-h-[18rem] min-h-[18rem] flex items-center rounded-lg justify-center hexagon -mt-36">
        <div className="shadow-2xl shadow-purple900">.</div>
        <div className="hexagon flex max-w-[16.125rem] min-w-[16.125rem] max-h-[18.125rem] min-h-[18.125rem] bg-purple900 absolute z-[1]" />
        {!person?.image.url && (
          <div className="hexagon flex max-w-[16rem] min-w-[16rem] max-h-[18rem] min-h-[18rem] bg-gray100 absolute z-[2]" />
        )}
        <Avatar.Image
          className="hexagon flex max-w-[16rem] min-w-[16rem] max-h-[18rem] min-h-[18rem] overflow-hidden object-cover rounded-lg z-[3]"
          src={person?.image.url ?? undefined}
          alt={person?.image.alt}
        />
        <Avatar.Fallback className="z-[4]">
          <VenetianMask className="w-16 h-16 fill-purple800 " />
        </Avatar.Fallback>
      </Avatar.Root>

      <h2 className="text-3xl font-bold mt-4">{person?.name?.fullName}</h2>
    </main>
  )
}
