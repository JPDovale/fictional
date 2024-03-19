import { PersonType } from '@modules/persons/entities/types'
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks'
import { FolderTree } from '@rComponents/application/FolderTree'
import { Loading } from '@rComponents/application/Loading'
import { ScrollArea } from '@rComponents/application/ScrollArea'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@rComponents/ui/resizable'
import { useBuildBlocks } from '@rHooks/useBuildBlocks'
import { useFolderTree } from '@rHooks/useFolderTree'
import { useProject } from '@rHooks/useProject'
import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { mainStyles } from '@rStyles/theme'
import {
  FileEdit,
  Folder,
  Home,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react'
import { Outlet, useParams } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const overlayImageStyles = tv({
  base: 'absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t to-transparent ease-in-out duration-300 ',
  variants: {
    theme: {
      [Theme.DARK]: 'from-gray100 via-gray100/80',
      [Theme.LIGHT]: 'from-gray900 via-gray900/50',
      [Theme.SYSTEM]: '',
    },
  },
})

export function ProjectLayout() {
  const { theme } = useTheme()
  const { projectId } = useParams()
  const { nodeIdSelected, setNodeIdSelected } = useFolderTree()
  const { isLoading, project, useHeader, usePersons } = useProject({
    projectId: projectId as string,
  })
  const { paths, Header } = useHeader()
  const { getName, getIcon, isBlockActive } = useBuildBlocks(
    project?.buildBlocks,
  )
  const { persons } = usePersons()

  if (isLoading) return <Loading />

  const imageUrl = project?.image.url
  const imageAlt = project?.image.alt

  return (
    <div
      className={`w-screen max-h-screen h-screen overflow-hidden flex  ${mainStyles(
        {
          theme,
        },
      )} `}
    >
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="max-w-xs" defaultSize={280} maxSize={320}>
          <ScrollArea>
            <FolderTree
              nodes={[
                { id: '1', name: 'Inicio', path: '/', icon: Home },
                {
                  closed: false,
                  id: '2',
                  icon: Folder,
                  name: 'Projeto',
                  childs: [
                    {
                      id: '3',
                      icon: Folder,
                      name: 'Inicio',
                      path: `/projects/${projectId}`,
                    },
                    {
                      id: '4',
                      icon: getIcon(BuildBlock.FOUNDATION),
                      name: getName(BuildBlock.FOUNDATION),
                      isToShow: isBlockActive(BuildBlock.FOUNDATION),
                      path: `/projects/${projectId}/foundation`,
                      childs: [
                        {
                          id: '8',
                          icon: FileEdit,
                          name: 'Fundamento',
                          path: `/projects/${projectId}/foundation/foundation-text`,
                        },
                        {
                          id: '9',
                          icon: FileEdit,
                          name: 'O quê acontece?',
                          path: `/projects/${projectId}/foundation/what-happens`,
                        },
                        {
                          id: '10',
                          icon: FileEdit,
                          name: 'Por que acontece?',
                          path: `/projects/${projectId}/foundation/why-happens`,
                        },
                        {
                          id: '11',
                          icon: FileEdit,
                          name: 'Onde acontece?',
                          path: `/projects/${projectId}/foundation/where-happens`,
                        },
                        {
                          id: '12',
                          icon: FileEdit,
                          name: 'Com quem acontece?',
                          path: `/projects/${projectId}/foundation/who-happens`,
                        },
                      ],
                    },
                    {
                      id: '5',
                      path: `/projects/${projectId}/persons/new`,
                      isToShow: isBlockActive(BuildBlock.PERSONS),
                      icon: getIcon(BuildBlock.PERSONS),
                      name: getName(BuildBlock.PERSONS),
                      actions: [
                        {
                          label: 'Novo personagem',
                          path: `/projects/${projectId}/persons/new`,
                          Icon: UserPlus,
                        },
                      ],
                      childs: [
                        {
                          id: '13',
                          icon: Users,
                          name: 'Protagonistas',
                          childs: persons
                            .filter((p) => p.type === PersonType.PROTAGONIST)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '14',
                          icon: Users,
                          name: 'Alivio comico',
                          childs: persons
                            .filter((p) => p.type === PersonType.COMIC)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '15',
                          icon: Users,
                          name: 'Figurantes',
                          childs: persons
                            .filter((p) => p.type === PersonType.EXTRA)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '16',
                          icon: Users,
                          name: 'Mentores',
                          childs: persons
                            .filter((p) => p.type === PersonType.MENTOR)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '17',
                          icon: Users,
                          name: 'Simbólicos',
                          childs: persons
                            .filter((p) => p.type === PersonType.SYMBOLIC)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '18',
                          icon: Users,
                          name: 'Adversarios',
                          childs: persons
                            .filter((p) => p.type === PersonType.ADVERSARY)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '19',
                          icon: Users,
                          name: 'Secondarios',
                          childs: persons
                            .filter((p) => p.type === PersonType.SECONDARY)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '20',
                          icon: Users,
                          name: 'Suportes',
                          childs: persons
                            .filter((p) => p.type === PersonType.SUPPORTING)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                        {
                          id: '21',
                          icon: Users,
                          name: 'Antagonistas',
                          childs: persons
                            .filter((p) => p.type === PersonType.ANTAGONIST)
                            .map((person) => ({
                              id: person.id,
                              name: person.name,
                              path: `/projects/${projectId}/persons/${person.id}`,
                              icon: User,
                            })),
                        },
                      ],
                    },
                    {
                      id: '6',
                      path: `/projects/${projectId}/time-lines`,
                      icon: getIcon(BuildBlock.TIME_LINES),
                      isToShow: isBlockActive(BuildBlock.TIME_LINES),
                      name: getName(BuildBlock.TIME_LINES),
                    },
                    {
                      id: '7',
                      path: `/projects/${projectId}/config`,
                      icon: Settings,
                      name: 'Configurações',
                    },
                  ],
                },
              ]}
              nodeSelected={nodeIdSelected}
              setNodeSelected={setNodeIdSelected}
            />
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={1200}>
          <div className="w-full min-h-full max-h-full overflow-y-auto relative flex flex-col ">
            <Header />

            <div className="w-full max-h-[38rem] min-h-[38rem] relative flex items-center overflow-hidden z-0">
              {imageUrl && (
                <img
                  className="w-full h-full object-cover"
                  src={imageUrl}
                  alt={imageAlt}
                />
              )}
              <div className={overlayImageStyles({ theme })} />
            </div>

            <div
              data-has-title={paths.includes('Configurações')}
              data-has-image={!!imageUrl}
              className="relative -mt-[17.5rem] data-[has-image=false]:-mt-[28rem] z-10 w-full flex flex-col data-[has-image=true]:data-[has-title=false]:-mt-[28rem]"
            >
              {paths.includes('Configurações') && (
                <h1 className="text-5xl text-center font-title min-w-[45rem] mx-auto max-w-[45rem] font-bold text-text600">
                  {project?.name}
                </h1>
              )}

              <div className="flex justify-between">
                <Outlet />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
