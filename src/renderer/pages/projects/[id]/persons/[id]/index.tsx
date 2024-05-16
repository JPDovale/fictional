import { Loading } from '@rComponents/application/Loading'
import { NotFound } from '@rComponents/application/NotFound'
import { useProject } from '@rHooks/useProject'
import { useParams } from 'react-router-dom'
import { useEditor } from '@rHooks/useEditor'
import { BlockEditor } from '@rComponents/application/BlockEditor'
import { useEffect, useState } from 'react'
import { IdentityPersonCard } from './components/IdentityPersonCard'
import { UpdatePersonForm } from './components/UpdatePersonForm'

export function PersonIdentityPage() {
  const [editIsOpen, setEditIsOpen] = useState(false)
  const { projectId, personId } = useParams()

  const { usePersons, isLoading } = useProject({
    projectId: projectId as string,
  })
  const { persons: personsWithSelected, getTempPersistenceKey } = usePersons()
  const person = personsWithSelected.find((p) => p.id === personId)

  const { editor } = useEditor({
    preValueKey: getTempPersistenceKey('history', personId as string),
    onDiff: (value) => console.log(value),
    personsSuggestion: personsWithSelected,
  })

  console.log(editor)

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
        <IdentityPersonCard
          person={person}
          onEdit={() => setEditIsOpen(true)}
        />
      )}

      {/* {editor && ( */}
      {/*   <BlockEditor */}
      {/*     title={`História de ${person.name}`} */}
      {/*     editor={editor} */}
      {/*   /> */}
      {/* )} */}
    </main>
  )
}
