import { Page404 } from '@components/404'
import { Editor } from '@components/Editor'
import { useEditor } from '@hooks/useEditor'
import { usePersons } from '@store/Persons'
import { useProjects } from '@store/Projects'
import { useEffect, useRef } from 'react'

export function PersonHistoryPage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
  }))
  const { person, updateHistory, isLoading } = usePersons((state) => ({
    person: state.currentPerson,
    updateHistory: state.updateHistory,
    isLoading: state.isLoading,
  }))

  const editorStateRef = useRef<string>(
    (isLoading ? '<p></p>' : person?.history) ?? '<p></p>',
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHistory = person?.history

      if (!isLoading && person && currentHistory !== editorStateRef.current) {
        updateHistory(editorStateRef.current)
      }
    }, 1000 * 2)

    return () => clearInterval(interval)
  }, [person, updateHistory, isLoading])

  function saveHistory(text: string) {
    editorStateRef.current = text
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'history',
        onUpdate: saveHistory,
        preValue: editorStateRef.current,
        useProject: [project!],
      },
    ],
  })

  if (project?.structure === 'snowflake') return <Page404 />

  return (
    <main className="flex-1 p-4 flex flex-col gap-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h2 className="text-3xl font-bold mb-4">História do personagem</h2>
      <span className="text-sm text-justify">
        Uma história bem definida é essencial para dar vida e significado a um
        personagem em um livro. Ela é como o alicerce sobre o qual todo o
        desenvolvimento do personagem é construído, fornecendo profundidade,
        motivação e coerência à sua jornada.
      </span>

      <h3 className="text-xl font-bold mt-8 opacity-50">Vamos começar!</h3>
      {Editors.history && <Editor editor={Editors.history.editor} />}
    </main>
  )
}
