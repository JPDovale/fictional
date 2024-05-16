import {
  ArrowDownWideNarrow,
  BookUp2,
  Edit,
  FileStack,
  Fingerprint,
  Focus,
  LayoutList,
  PilcrowSquare,
  UnfoldHorizontal,
  UserSquare,
  VenetianMask,
} from 'lucide-react'
import { RoutesAvailable } from '@config/routes/routesAvailable'
import { useRoutes } from '@store/Routes'
import { SnowflakeStepButton } from '@components/SnowflakeStructureComponents/SnowflakeStepButton'
import { useSnowflakeStructure } from '@hooks/useSnowflakeStructure'
import { BookModelResponse } from '@modules/Books/dtos/models/types'

interface SnowflakeInnerSessionProps {
  projectId: string
  multiBooksTitle?: string
  redirectorMultiBook?: () => void
  bookReceived: BookModelResponse | null
}

export function SnowflakeInnerSession({
  projectId,
  multiBooksTitle,
  redirectorMultiBook,
  bookReceived,
}: SnowflakeInnerSessionProps) {
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }))

  const { useSnowflakeStructureVerifications } = useSnowflakeStructure()
  const { verifications } = useSnowflakeStructureVerifications(
    bookReceived?.snowflakeStructure,
  )

  function handleNavigateToStructure() {
    if (redirectorMultiBook) return redirectorMultiBook()

    return setPathname({
      routerParameterized: RoutesAvailable.projectStructure.to(projectId),
    })
  }

  return (
    <div className="w-full border-l-4 border-base600 border-opacity-75 px-4">
      <div className="flex justify-between items-center">
        <h5 className="text-xl uppercase font-bold opacity-60">
          Você está usando a estrutura Snowflake
          {multiBooksTitle && ` em ${multiBooksTitle}`}:
        </h5>

        <button
          type="button"
          onClick={handleNavigateToStructure}
          className="focus:scale-[120%] ease-in-out duration-300"
        >
          <Edit className="fill-purple900 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 mt-4 gap-4">
        <SnowflakeStepButton Icon={Focus} text="Ideia central" />
        <SnowflakeStepButton
          Icon={PilcrowSquare}
          text="Ao paragrafo"
          disabled={verifications.verifyParagraph().disabled}
        />
        <SnowflakeStepButton
          Icon={VenetianMask}
          text="Sobre quem?"
          disabled={verifications.verifyPersonsBase().disabled}
        />
        <SnowflakeStepButton
          Icon={UnfoldHorizontal}
          text="Expansão"
          disabled={verifications.verifyPage().disabled}
        />
        <SnowflakeStepButton
          Icon={UserSquare}
          text="Quanto mais real, melhor"
          disabled={verifications.verifyPersonsExpansion().disabled}
        />
        <SnowflakeStepButton
          Icon={ArrowDownWideNarrow}
          text="Entrelaçamento"
          disabled={verifications.verifyInterweaving().disabled}
        />
        <SnowflakeStepButton
          Icon={Fingerprint}
          text="Os detalhes"
          disabled={verifications.verifyPersonsFinal().disabled}
        />
        <SnowflakeStepButton
          Icon={FileStack}
          text="Fragmentação"
          disabled={verifications.verifyFragmentation().disabled}
        />
        <SnowflakeStepButton
          Icon={LayoutList}
          text=" Do macro ao micro"
          disabled={verifications.verifySlicesExpansion().disabled}
        />
        <SnowflakeStepButton
          Icon={BookUp2}
          text="O fim?"
          disabled={verifications.verifyFinalText().disabled}
        />
      </div>
    </div>
  )
}
