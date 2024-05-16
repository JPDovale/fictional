import { FolderTree } from '@rComponents/application/FolderTree'
import { Loading } from '@rComponents/application/Loading'
import { ScrollArea } from '@rComponents/application/ScrollArea'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@rComponents/ui/resizable'
import { useFolderTree } from '@rHooks/useFolderTree'
import { useProject } from '@rHooks/useProject'
import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { mainStyles } from '@rStyles/theme'
import { Home } from 'lucide-react'
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
  const {
    isLoading: isLoadingProject,
    project,
    useHeader,
    useTreeFolder,
    usePersons,
    usePersonsAttributes,
    useFoundation,
  } = useProject({
    projectId: projectId as string,
  })
  const { isLoading: isLoadingPersons } = usePersons()
  const { isLoading: isLoadingFoundation } = useFoundation()
  const { isLoading: isLoadingPersonsAttributes } = usePersonsAttributes()
  const { paths, Header } = useHeader()
  const projectTree = useTreeFolder()

  const isLoading =
    isLoadingProject ||
    isLoadingPersons ||
    isLoadingPersonsAttributes ||
    isLoadingFoundation

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
                projectTree,
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
