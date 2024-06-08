import { MutationResponse } from '@modules/persons/presenters/Attribute.presenter';
import { BlockEditor } from '@rComponents/application/BlockEditor';
import { EditorMenuOption } from '@rComponents/application/Editor/components/FloatingMenuEditor';
import { useEditor } from '@rHooks/useEditor';
import { useProject } from '@rHooks/useProject';
import { normalizeEventDate } from '@rUtils/normalizeEventDate';
import { useParams } from 'react-router-dom';

interface AttributeMutationEditorProps {
  mutation: MutationResponse;
  menuOptions: EditorMenuOption[];
}

export function AttributeMutationEditor({
  mutation,
  menuOptions,
}: AttributeMutationEditorProps) {
  const { projectId } = useParams();

  const { usePersons, useFile, project } = useProject({
    projectId,
  });
  const { persons } = usePersons();

  const { file, getTempPersistenceKey, isLoading, updateFile } = useFile({
    fileId: mutation.fileId,
  });

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updateFileOnDiff(value),
    personsSuggestion: persons,
  });

  async function updateFileOnDiff(value: string) {
    if (isLoading) return;
    if (!file) return;
    if (file.content === value) return;

    await updateFile({ content: value });
  }

  return (
    <div className="border-b border-b-gray400">
      <h3 className="text-2xl -mb-16 mt-16 font-bold opacity-30">
        Alteração {mutation.position}
      </h3>

      {mutation.date && project?.buildBlocks.TIME_LINES && (
        <span className="text-xxs -mb-16 mt-16 opacity-30">
          {normalizeEventDate(mutation.date.date)}
        </span>
      )}

      {editor && (
        <>
          <BlockEditor editor={editor} menuOptions={menuOptions} />
        </>
      )}
    </div>
  );
}
