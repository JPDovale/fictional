import { useEditor } from '@rHooks/useEditor'
import { BlockEditor } from '@rComponents/application/BlockEditor'
import { useProject } from '@rHooks/useProject'
import { useParams } from 'react-router-dom'

export function ProjectFoundationWhyHappensPage() {
  const { projectId } = useParams()
  const { useFoundation, usePersons } = useProject({
    projectId: projectId as string,
  })
  const { foundation, updateFoundation, isLoading, getTempPersistenceKey } =
    useFoundation()
  const { persons } = usePersons()

  function updateFoundationOnDiff(value: string) {
    if (isLoading) return
    if (!foundation) return
    if (foundation.whyHappens === value) return

    updateFoundation({ whyHappens: value })
  }

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey('whyHappens'),
    onDiff: (value) => updateFoundationOnDiff(value),
    personsSuggestion: persons,
  })

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto py-4">
      <h2 className="text-3xl font-bold mb-4">Por que acontece?</h2>

      {editor && <BlockEditor title="Por que acontece?" editor={editor} />}
    </main>
  )
}
