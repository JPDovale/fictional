import { MutationResponse } from '@modules/persons/presenters/Attribute.presenter';
import { EditorMenuOption } from '@rComponents/application/Editor/components/FloatingMenuEditor';
import { useProject } from '@rHooks/useProject';
import { normalizeEventDate } from '@rUtils/normalizeEventDate';
import { useParams } from 'react-router-dom';
import { ChangePositionMutation } from './ChangePositionMutation';
import { DeleteMutationDialog } from './DeleteMutationDialog';
import { MutationEditor } from './MutationEditor';
import { UpdateMutationDialog } from './UpdateMutationDialog';

interface AttributeMutationEditorProps {
  mutation: MutationResponse;
  lastPossition: number;
  menuOptions: EditorMenuOption[];
}

export function AttributeMutationEditor({
  mutation,
  lastPossition = 0,
  menuOptions,
}: AttributeMutationEditorProps) {
  const { projectId } = useParams();
  const { project } = useProject({ projectId });

  return (
    <li className="border-b border-b-gray500/60">
      <div className="flex -mb-16 mt-16 justify-between items-center">
        <h3 className="text-2xl font-bold opacity-30">
          Alteração {mutation.position}{' '}
          {mutation.title && `- ${mutation.title}`}
        </h3>

        <div className="flex gap-1">
          <UpdateMutationDialog mutation={mutation} />
          <ChangePositionMutation
            mutation={mutation}
            lastPossition={lastPossition}
          />
          <DeleteMutationDialog mutation={mutation} />
        </div>
      </div>

      {mutation.date && project?.buildBlocks.TIME_LINES && (
        <span className="text-xxs -mb-16 mt-16 opacity-30">
          {normalizeEventDate(mutation.date.date)}
        </span>
      )}

      <MutationEditor menuOptions={menuOptions} mutation={mutation} />
    </li>
  );
}
