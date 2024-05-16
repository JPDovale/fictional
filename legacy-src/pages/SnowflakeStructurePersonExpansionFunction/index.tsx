import { Editor } from '@components/Editor'
import { PersonExpansionSnowFlakeNavigation } from '@components/PersonsComponents/PersonExpansionSnowFlakeNavigation'
import { SnowflakeFloatPreStructure } from '@components/SnowflakeStructureComponents/SnowflakeFloatPreStructure'
import { useEditor } from '@hooks/useEditor'
import { usePersons } from '@store/Persons'
import { useProjects } from '@store/Projects'
import { useEffect, useRef } from 'react'

export function SnowflakeStructurePersonExpansionFunctionPage() {
  const { project } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }))

  const { person, isLoading, updateSnowflake } = usePersons((state) => ({
    person: state.currentPerson,
    isLoading: state.isLoading,
    updateSnowflake: state.updateSnowflake,
  }))

  const editorStateRef = useRef<string>(
    (isLoading ? '<p></p>' : person?.snowflakeStructureExpansion?.function) ??
      '<p></p>',
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSnowflakeFunction =
        person?.snowflakeStructureExpansion?.function

      if (
        !isLoading &&
        person &&
        currentSnowflakeFunction !== editorStateRef.current
      ) {
        updateSnowflake({
          expansionFunction: editorStateRef.current,
        })
      }
    }, 1000 * 2)

    return () => clearInterval(interval)
  }, [person, isLoading, updateSnowflake])

  function savePersonFunction(text: string) {
    editorStateRef.current = text
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'personFunction',
        onUpdate: savePersonFunction,
        preValue: editorStateRef.current,
        useProject: [project!],
      },
    ],
  })

  return (
    <>
      <div className="flex w-full">
        <main className="py-4 min-w-[35rem] px-6 w-auto mx-auto max-w-[45rem]">
          <h2 className="text-3xl font-bold mb-4">
            Função expansion do personagem
          </h2>
          <span className="text-sm text-justify">Definir depois</span>

          {Editors.personFunction && (
            <Editor editor={Editors.personFunction.editor} />
          )}
        </main>

        <SnowflakeFloatPreStructure
          title="Base - Função"
          types={[
            {
              html: person?.snowflakeStructureBase?.function,
            },
          ]}
        />
      </div>
      <PersonExpansionSnowFlakeNavigation />
    </>
  )
}
