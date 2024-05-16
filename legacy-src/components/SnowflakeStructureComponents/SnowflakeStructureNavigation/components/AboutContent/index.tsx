import { ProjectModelResponse } from '@modules/Projects/dtos/models/types'
import * as Tabs from '@radix-ui/react-tabs'
import { getDate } from '@utils/dates/getDate'

interface AboutContentProps {
  isToShowContent: boolean
  project: ProjectModelResponse | null
}

export function AboutContent({ isToShowContent, project }: AboutContentProps) {
  return (
    <Tabs.Content value="projectStructure" asChild>
      <div className="p-2 outline-none flex flex-col items-center gap-4">
        {isToShowContent && (
          <>
            <div className="flex flex-col w-full gap-0.5">
              <span className="text-xxs uppercase opacity-40">Nome</span>
              <span className="font-title">{project?.name}</span>
            </div>

            <div className="flex flex-col w-full gap-0.5">
              <span className="text-xxs uppercase opacity-40">Criado em</span>
              <span className="text-xs">
                {project?.createdAt ? getDate(project.createdAt) : '??????????'}
              </span>
            </div>
            <div className="flex flex-col w-full gap-0.5">
              <span className="text-xxs uppercase opacity-40">
                Atualizado em
              </span>
              <span className="text-xs">
                {project?.updatedAt ? getDate(project.updatedAt) : '??????????'}
              </span>
            </div>
          </>
        )}
      </div>
    </Tabs.Content>
  )
}
