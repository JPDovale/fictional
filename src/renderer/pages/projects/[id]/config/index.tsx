import { NotFound } from '@rComponents/application/NotFound';
import { useProject } from '@rHooks/useProject';
import { useParams } from 'react-router-dom';
import { BuildBlockUsing } from '@rComponents/projects/BuildBlockUsing';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { InfoBlock } from '../components/InfoBlock';

export function ProjectConfigPage() {
  const { projectId } = useParams();
  const { project } = useProject({ projectId });

  if (!project) return <NotFound />;

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto py-4">
      <InfoBlock.Root className="mt-10">
        <InfoBlock.Header>
          <InfoBlock.Title>
            Você está usando os blocos de construção:
          </InfoBlock.Title>
          <InfoBlock.EditButton />
        </InfoBlock.Header>

        <InfoBlock.Body className="grid grid-cols-4 gap-4 mt-4">
          {Object.entries(project.buildBlocks).map(([k, v]) => {
            if (!v) return null;
            return <BuildBlockUsing key={k} buildBlock={k as BuildBlock} />;
          })}
        </InfoBlock.Body>
      </InfoBlock.Root>
    </main>
  );
}
