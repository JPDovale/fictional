import {
  ArrowDownWideNarrow,
  BookUp2,
  FileStack,
  Fingerprint,
  Focus,
  LayoutList,
  PilcrowSquare,
  UnfoldHorizontal,
  UserSquare,
  VenetianMask,
} from 'lucide-react'
import { BookModelResponse } from '@modules/Books/dtos/models/types'
import { useRoutes } from '@store/Routes'
import { useProjects } from '@store/Projects'
import { useSnowflakeStructure } from '@hooks/useSnowflakeStructure'
import { SnowflakeStepButton } from '../SnowflakeStepButton'

interface SnowflakeStructureProps {
  book?: BookModelResponse
}

export function SnowflakeStructure({ book }: SnowflakeStructureProps) {
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }))
  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }))

  const bookReceived = book || project?.books[0]
  const isToMultiBook = project?.features['multi-book'] ?? false

  const { useSnowflakeStructureVerifications } = useSnowflakeStructure()
  const { verifications } = useSnowflakeStructureVerifications(
    bookReceived?.snowflakeStructure,
  )

  function handleNavigateToStep(step: keyof typeof verifications) {
    const { redirectorBook, redirectorProject } = verifications[step]()

    if (isToMultiBook) {
      return setPathname({
        routerParameterized: redirectorBook(
          bookReceived!.projectId,
          bookReceived!.id,
        ),
      })
    }

    return setPathname({
      routerParameterized: redirectorProject(bookReceived!.projectId),
    })
  }

  return (
    <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h2 className="text-3xl font-bold mb-4">
        Você está usando a estrutura Snowflake{book && ` em "${book.title}"`}
      </h2>
      <span className="text-sm text-justify">
        O método Snowflake foi criado pelo escritor e engenheiro de software
        Randy Ingermanson. Ele propôs um processo estruturado de desenvolvimento
        de enredos para ajudar os escritores a planejarem suas histórias, que é
        chamado de &quot;Método Snowflake&quot; por causa de sua abordagem de
        construção gradual e expansão progressiva.
        <br />
        <br />O Método Snowflake enfatiza a estrutura e o planejamento cuidadoso
        antes de iniciar o processo de escrita, o que pode ajudar os escritores
        a evitar bloqueios criativos e a ter uma visão mais clara de sua
        história antes de começar a escrever. Lembre-se de que diferentes
        escritores podem ter variações no método para melhor se adequar ao seu
        estilo e necessidades individuais.
        <br />
        <br />O Método Snowflake é dividido em 10 etapas diferentes, as quais
        devem ser executas em ondem sequencial. Por esse motivo você não pode,
        ou não deveria, passar para o próximo passo, sem antes terminar o
        anterior. Por esses motivos os botões ficam desabilitados até que você
        preencha o campo prévio, para aí sim prosseguir, mas se não gostar disso
        pode desativar nas configurações.
      </span>

      <h2 className="font-bold text-xl uppercase mt-12">Vamos começar!</h2>

      <div className="grid grid-cols-3 mt-4 gap-4">
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyCentralIdia')}
          Icon={Focus}
          text="Ideia central"
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyParagraph')}
          Icon={PilcrowSquare}
          text="Ao paragrafo"
          disabled={verifications.verifyParagraph().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyPersonsBase')}
          Icon={VenetianMask}
          text="Sobre quem?"
          disabled={verifications.verifyPersonsBase().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyPage')}
          Icon={UnfoldHorizontal}
          text="Expansão"
          disabled={verifications.verifyPage().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyPersonsExpansion')}
          Icon={UserSquare}
          text="Quanto mais real, melhor"
          disabled={verifications.verifyPersonsExpansion().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyInterweaving')}
          Icon={ArrowDownWideNarrow}
          text="Entrelaçamento"
          disabled={verifications.verifyInterweaving().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyPersonsFinal')}
          Icon={Fingerprint}
          text="Os detalhes"
          disabled={verifications.verifyPersonsFinal().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyFragmentation')}
          Icon={FileStack}
          text="Fragmentação"
          disabled={verifications.verifyFragmentation().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifySlicesExpansion')}
          Icon={LayoutList}
          text=" Do macro ao micro"
          disabled={verifications.verifySlicesExpansion().disabled}
        />
        <SnowflakeStepButton
          onClick={() => handleNavigateToStep('verifyFinalText')}
          Icon={BookUp2}
          text="O fim?"
          disabled={verifications.verifyFinalText().disabled}
        />
      </div>
    </main>
  )
}
