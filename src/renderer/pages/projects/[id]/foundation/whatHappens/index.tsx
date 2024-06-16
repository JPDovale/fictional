import { useEditor } from '@rHooks/useEditor';
import { BlockEditor } from '@rComponents/application/BlockEditor';
import { useProject } from '@rHooks/useProject';
import { useParams } from 'react-router-dom';
import { NotFound } from '@rComponents/application/NotFound';

export function ProjectFoundationWhatHappensPage() {
  const { projectId } = useParams();
  const { useFoundation, usePersons } = useProject({ projectId });
  const {
    foundation,
    updateFoundation,
    isLoadingFoundation,
    getTempPersistenceKey,
  } = useFoundation();
  const { persons } = usePersons();

  function updateFoundationOnDiff(value: string) {
    if (isLoadingFoundation) return;
    if (!foundation) return;
    if (foundation.whatHappens === value) return;

    updateFoundation({ whatHappens: value });
  }

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey('whatHappens'),
    onDiff: (value) => updateFoundationOnDiff(value),
    personsSuggestion: persons,
  });

  if (!foundation && !isLoadingFoundation) return <NotFound />;

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto py-4">
      <h2 className="text-3xl font-bold mb-4">O que acontece?</h2>

      <BlockEditor
        title="O que acontece?"
        editor={editor}
        isLoading={isLoadingFoundation}
      />
    </main>
  );
}
