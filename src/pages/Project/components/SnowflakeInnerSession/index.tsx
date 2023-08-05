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
} from 'lucide-react';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useRoutes } from '@store/Routes';
import { SnowflakeStepButton } from '@components/SnowflakeStructureComponents/SnowflakeStepButton';

interface SnowflakeInnerSessionProps {
  projectId: string;
  multiBooksTitle?: string;
  redirectorMultiBook?: () => void;
}

export function SnowflakeInnerSession({
  projectId,
  multiBooksTitle,
  redirectorMultiBook,
}: SnowflakeInnerSessionProps) {
  const { setPathname } = useRoutes((state) => ({
    setPathname: state.setPathname,
  }));

  function handleNavigateToStructure() {
    if (redirectorMultiBook) return redirectorMultiBook();

    return setPathname({
      routerParameterized: RoutesAvailable.projectStructure.to(projectId),
    });
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
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={Focus}
          text="Ideia central"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={PilcrowSquare}
          text="Ao paragrafo"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={VenetianMask}
          text="Sobre quem?"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={UnfoldHorizontal}
          text="Expansão"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={UserSquare}
          text="Quanto mais real, melhor"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={ArrowDownWideNarrow}
          text="Entrelaçamento"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={Fingerprint}
          text="Os detalhes"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={FileStack}
          text="Fragmentação"
        />
        <SnowflakeStepButton
          onClick={() => {}}
          Icon={LayoutList}
          text=" Do macro ao micro"
        />
        <SnowflakeStepButton onClick={() => {}} Icon={BookUp2} text="O fim?" />
      </div>
    </div>
  );
}
