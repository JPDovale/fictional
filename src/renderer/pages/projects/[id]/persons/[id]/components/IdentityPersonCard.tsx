import { Button } from '@rComponents/application/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@rComponents/ui/avatar'
import { useProject } from '@rHooks/useProject'
import { useTheme } from '@rHooks/useTheme'
import { Pen, VenetianMask } from 'lucide-react'
import { useParams } from 'react-router-dom'

interface IndentityPersonCardProps {
  onEdit: () => void
}

export function IdentityPersonCard({
  onEdit,
}: IndentityPersonCardProps) {
  const { theme } = useTheme()
  const { projectId, personId } = useParams()
  const { usePersons, usePerson } = useProject({ projectId: projectId as string })
  const { persons } = usePersons()
  const { person } = usePerson({ personId: personId as string })

  const mother = persons.find((p) => p.id === person?.motherId)
  const father = persons.find((p) => p.id === person?.fatherId)

  if (!person) return null

  return (
    <div data-theme={theme} className="flex flex-col bg-gray100/30 data-[theme=light]:bg-gray900/30 relative shadow-2xl backdrop-blur-sm rounded-lg gap-4 p-4">
      <div className="flex items-center gap-8">
        <Avatar className="w-48 h-48 ">
          <AvatarImage
            src={person.image.url ?? undefined}
            className="object-cover"
          />
          <AvatarFallback className="bg-transparent border border-purple900">
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
