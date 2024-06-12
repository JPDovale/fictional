import { MutationResponse } from '@modules/persons/presenters/Attribute.presenter';
import { BlockEditor } from '@rComponents/application/BlockEditor';
import { EditorMenuOption } from '@rComponents/application/Editor/components/FloatingMenuEditor';
import { useEditor } from '@rHooks/useEditor';
import { useProject } from '@rHooks/useProject';
import { useParams } from 'react-router-dom';

interface MutationEditorProps {
  mutation: MutationResponse;
  menuOptions: EditorMenuOption[];
}

export function MutationEditor({ mutation, menuOptions }: MutationEditorProps) {
  const { projectId } = useParams();
  const { usePersons, useFile } = useProject({
    projectId,
  });
  const { persons } = usePersons();
  const { file, getTempPersistenceKey, isLoadingFile, updateFile } = useFile({
    fileId: mutation.fileId,
  });

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updateFileOnDiff(value),
    personsSuggestion: persons,
  });

  async function updateFileOnDiff(value: string) {
    if (isLoadingFile) return;
    if (!file) return;
    if (file.content === value) return;

    await updateFile({ content: value });
  }

  return (
    <BlockEditor
      editor={editor}
      menuOptions={menuOptions}
      isLoading={isLoadingFile}
    />
  );
}
