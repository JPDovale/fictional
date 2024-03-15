import {
  BuildBlock,
  BuildBlocksJson,
} from '@modules/projects/valueObjects/BuildBlocks'
import { Gear } from '@phosphor-icons/react'
import { FolderTree } from '@rComponents/application/FolderTree'
import { Loading } from '@rComponents/application/Loading'
import { Navigation } from '@rComponents/application/Navigation'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@rComponents/ui/resizable'
import { useBuildBlocks } from '@rHooks/useBuildBlocks'
import { useProject } from '@rHooks/useProject'
import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { mainStyles } from '@rStyles/theme'
import { Folder, Home, Settings } from 'lucide-react'
import { useState } from 'react'
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
  const { isLoading, project, useHeader } = useProject({
    projectId: projectId as string,
  })
  const { paths, Header } = useHeader()
  const { getName, getIcon, filterAvailableNavLinksBasedInBuildBlocks } =
    useBuildBlocks()

  const [nodeIdSelected, setNodeIdSelected] = useState('3')

  if (isLoading) return <Loading />

  const projectLinks = filterAvailableNavLinksBasedInBuildBlocks(
    [
      {
        pathname: '/',
        Icon: Home,
        label: 'Inicio',
      },
      {
        pathname: `/projects/${projectId}`,
        Icon: Folder,
        label: 'Projeto',
      },
      {
        pathname: `/projects/${projectId}/foundation`,
        Icon: getIcon(BuildBlock.FOUNDATION),
        label: getName(BuildBlock.FOUNDATION),
      },
      {
        pathname: `/projects/${projectId}/persons`,
        Icon: getIcon(BuildBlock.PERSONS),
        label: getName(BuildBlock.PERSONS),
      },
      {
        pathname: `/projects/${projectId}/time-lines`,
        Icon: getIcon(BuildBlock.TIME_LINES),
        label: getName(BuildBlock.TIME_LINES),
      },
      {
        pathname: `/projects/${projectId}/config`,
        Icon: Gear,
        label: 'Configurações',
      },
    ],
    project?.buildBlocks as BuildBlocksJson,
  )

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
        <ResizablePanel className="max-w-xs" defaultSize={220} maxSize={320}>
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
                    path: `/projects/${projectId}/foundation`,
                  },
                  {
                    id: '5',
                    path: `/projects/${projectId}/persons`,
                    icon: getIcon(BuildBlock.PERSONS),
                    name: getName(BuildBlock.PERSONS),
                  },
                  {
                    id: '6',
                    path: `/projects/${projectId}/time-lines`,
                    icon: getIcon(BuildBlock.TIME_LINES),
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
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={1200}>
          <div className="w-full min-h-full max-h-full overflow-y-auto relative flex flex-col ">
            <Header />

            {imageUrl && (
              <div className="w-full max-h-[38rem] min-h-[38rem] relative flex items-center overflow-hidden z-0">
                <img
                  className="w-full h-full object-cover"
                  src={imageUrl}
                  alt={imageAlt}
                />
                <div className={overlayImageStyles({ theme })} />
              </div>
            )}

            <div
              data-has-title={paths.length === 2}
              data-has-image={!!imageUrl}
              className="relative mt-14 data-[has-image=true]:-mt-80 z-10 w-full flex flex-col data-[has-image=true]:data-[has-title=false]:-mt-[28rem]"
            >
              {paths.length === 2 && (
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
