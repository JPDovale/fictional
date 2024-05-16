import { PersonWithParentsResponse } from '@modules/persons/presenters/PersonWithParents.presenter'
import { Button } from '@rComponents/application/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@rComponents/ui/avatar'
import { useProject } from '@rHooks/useProject'
import { Pen, VenetianMask } from 'lucide-react'
import { useParams } from 'react-router-dom'

interface IndentityPersonCardProps {
  person: PersonWithParentsResponse
  onEdit: () => void
}

export function IdentityPersonCard({
  person,
  onEdit,
}: IndentityPersonCardProps) {
  const { projectId } = useParams()
  const { usePersons } = useProject({ projectId: projectId as string })
  const { persons } = usePersons()

  const mother = persons.find((p) => p.id === person.motherId)
  const father = persons.find((p) => p.id === person.fatherId)

  return (
    <div className="flex flex-col bg-gray100/20 relative shadow-2xl backdrop-blur-sm rounded-lg gap-4 p-4">
      <div className="flex items-center gap-8">
        <Avatar className="w-48 h-48 bg-gray100">
          <AvatarImage
            src={person.image.url ?? undefined}
            className="object-cover"
          />
          <AvatarFallback className="bg-gray100 border border-purple900">
            <VenetianMask />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-4 w-full h-full">
          <div className="flex flex-col">
            <span className="text-xs font-bold opacity-60">Nome completo</span>
            <span className="text-sm">{person.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-60">
                Data de nascimento
              </span>
              <span className="text-sm">{person.birthDate ?? '??????'}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-60">
                Data de óbito
              </span>
              <span className="text-sm">{person.deathDate ?? '??????'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-60">Nome da Mãe</span>
              <span className="text-sm">{mother?.name ?? '??????'}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-60">Nome do Pai</span>
              <span className="text-sm">{father?.name ?? '??????'}</span>
            </div>
          </div>
        </div>
      </div>

      <Button.Root
        size="sm"
        width="hug"
        className="absolute bottom-4 right-4"
        onClick={onEdit}
      >
        <Button.Icon>
          <Pen />
        </Button.Icon>
      </Button.Root>
    </div>
  )
}
