import { Loading } from '@rComponents/application/Loading'
import { NotFound } from '@rComponents/application/NotFound'
import { useProject } from '@rHooks/useProject'
import { useParams } from 'react-router-dom'
import { useEditor } from '@rHooks/useEditor'
import { useEffect, useState } from 'react'
import { IdentityPersonCard } from './components/IdentityPersonCard'
import { UpdatePersonForm } from './components/UpdatePersonForm'
import { AttributesCards } from './components/AttributesCards'
import { BlockEditor } from '@rComponents/application/BlockEditor'

export function PersonIdentityPage() {
  const [editIsOpen, setEditIsOpen] = useState(false)
  const { projectId, personId } = useParams()

  const { usePersons, usePerson, isLoading } = useProject({
    projectId: projectId as string,
  })
  const { persons: personsWithSelected, refetchPersons } = usePersons()
  const { person, getTempPersistenceKey, updatePerson } = usePerson({ personId: personId as string })

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey(),
    onDiff: (value) => updatePersonOnDiff(value),
    personsSuggestion: personsWithSelected,
  })

  async function updatePersonOnDiff(value: string) {
    if (isLoading) return
    if (!person) return
    if (person.history === value) return

    await updatePerson({ history: value })
    refetchPersons()
  }

  useEffect(() => {
    setEditIsOpen(false)
  }, [personId])

  if (isLoading) {
    return <Loading />
  }

  if (!person) {
    return <NotFound />
  }

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto -mt-24 py-4">
      <h2 className="text-3xl font-bold mb-4">{person.name}</h2>
      {editIsOpen ? (
        <UpdatePersonForm onEdited={() => setEditIsOpen(false)} />
      ) : (
        <>
          <IdentityPersonCard onEdit={() => setEditIsOpen(true)} />

          {editor && (
            <BlockEditor
              title={`História de ${person.name}`}
              editor={editor}
            />
          )}

          <AttributesCards />
        </>
      )}

    </main>
  )
}
