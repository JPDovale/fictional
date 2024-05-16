import { useTheme } from '@hooks/useTheme'
import { ThreeActsStructureModelResponse } from '@modules/ThreeActsStructures/dtos/models/types'
import { Edit } from 'lucide-react'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { useRoutes } from '@store/Routes'
import { previewThreeActsStyles } from './styles'

interface ThreeActsInnerSessionProps {
  threeActsStructure?: ThreeActsStructureModelResponse | null
  multiBooksTitle?: string
  projectId: string
}

export function ThreeActsInnerSession({
  threeActsStructure,
  projectId,
  multiBooksTitle,
}: ThreeActsInnerSessionProps) {
  const { theme } = useTheme()
  const { setPathname } = useRoutes()

  function handleNavigateToStructure() {
    setPathname({
      routerParameterized: RoutesAvailable.projectStructure.to(projectId),
    })
  }

  if (!threeActsStructure) return null

  return (
    <div className="w-full border-l-4 border-base600 border-opacity-75 px-4">
      <div className="flex justify-between items-center">
        <h5 className="text-xl uppercase pr-4 font-bold opacity-60">
          Você está usando a estrutura de três atos{' '}
          {multiBooksTitle && ` para ${multiBooksTitle}`}:
        </h5>

        <button
          type="button"
          onClick={handleNavigateToStructure}
          className="focus:scale-[120%] ease-in-out duration-300"
        >
          <Edit className="fill-purple900 w-5" />
        </button>
      </div>
      <div className="flex flex-col mt-6 gap-12">
        <div className="flex flex-col gap-2.5">
          <span className="text-sm uppercase font-bold opacity-40">Ato 1:</span>
          {threeActsStructure?.act1 &&
          threeActsStructure?.act1 !== '<p></p>' ? (
            <div
              className={previewThreeActsStyles({ theme })}
              dangerouslySetInnerHTML={{
                __html: threeActsStructure.act1,
              }}
            />
          ) : (
            <div className={previewThreeActsStyles({ theme })}>
              <p className="opacity-40">Sem edição</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-sm uppercase font-bold opacity-40">Ato 2:</span>
          {threeActsStructure?.act2 &&
          threeActsStructure?.act2 !== '<p></p>' ? (
            <div
              className={previewThreeActsStyles({ theme })}
              dangerouslySetInnerHTML={{
                __html: threeActsStructure.act2,
              }}
            />
          ) : (
            <div className={previewThreeActsStyles({ theme })}>
              <p className="opacity-40">Sem edição</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-sm uppercase font-bold opacity-40">Ato 3:</span>
          {threeActsStructure?.act3 &&
          threeActsStructure?.act3 !== '<p></p>' ? (
            <div
              className={previewThreeActsStyles({ theme })}
              dangerouslySetInnerHTML={{
                __html: threeActsStructure.act3,
              }}
            />
          ) : (
            <div className={previewThreeActsStyles({ theme })}>
              <p className="opacity-40">Sem edição</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
