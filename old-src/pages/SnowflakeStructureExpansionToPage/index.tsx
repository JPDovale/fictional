import { BlockEditor } from '@components/BlockEditor'
import { SnowflakeFloatPreStructure } from '@components/SnowflakeStructureComponents/SnowflakeFloatPreStructure'
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation'
import { useEditor } from '@hooks/useEditor'
import { useBooks } from '@store/Books'
import { useProjects } from '@store/Projects'
import { isEqual } from 'lodash'
import { useEffect, useRef } from 'react'

interface EditorStateRef {
  paragraph1: string | null
  paragraph2: string | null
  paragraph3: string | null
  paragraph4: string | null
  paragraph5: string | null
}

export function SnowflakeStructureExpansionToPagePage() {
  const { project, updateSnowflakeStructure } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }))
  const { bookSelected, isLoading } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
  }))

  const book = bookSelected || project?.books[0]
  const editorStateRef = useRef<EditorStateRef>({
    paragraph1:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToPage?.paragraph1) ?? '<p></p>',
    paragraph2:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToPage?.paragraph2) ?? '<p></p>',
    paragraph3:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToPage?.paragraph3) ?? '<p></p>',
    paragraph4:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToPage?.paragraph4) ?? '<p></p>',
    paragraph5:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToPage?.paragraph5) ?? '<p></p>',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const currentExpansionToPage = book?.snowflakeStructure?.expansionToPage

      if (
        !isLoading &&
        book &&
        !isEqual(currentExpansionToPage, editorStateRef.current)
      ) {
        updateSnowflakeStructure({
          bookId: book.id,
          paragraph1: editorStateRef.current.paragraph1,
          paragraph2: editorStateRef.current.paragraph2,
          paragraph3: editorStateRef.current.paragraph3,
          paragraph4: editorStateRef.current.paragraph4,
          paragraph5: editorStateRef.current.paragraph5,
        })
      }
    }, 1000 * 2)

    return () => clearInterval(interval)
  }, [book, updateSnowflakeStructure, isLoading])

  function saveCentralIdia(
    text: string,
    id:
      | 'paragraph1'
      | 'paragraph2'
      | 'paragraph3'
      | 'paragraph4'
      | 'paragraph5',
  ) {
    editorStateRef.current[id] = text
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'paragraph1',
        onUpdate: (text: string) => saveCentralIdia(text, 'paragraph1'),
        preValue: book?.snowflakeStructure?.expansionToPage?.paragraph1 ?? '',
      },
      {
        id: 'paragraph2',
        onUpdate: (text: string) => saveCentralIdia(text, 'paragraph2'),
        preValue: book?.snowflakeStructure?.expansionToPage?.paragraph2 ?? '',
      },
      {
        id: 'paragraph3',
        onUpdate: (text: string) => saveCentralIdia(text, 'paragraph3'),
        preValue: book?.snowflakeStructure?.expansionToPage?.paragraph3 ?? '',
      },
      {
        id: 'paragraph4',
        onUpdate: (text: string) => saveCentralIdia(text, 'paragraph4'),
        preValue: book?.snowflakeStructure?.expansionToPage?.paragraph4 ?? '',
      },
      {
        id: 'paragraph5',
        onUpdate: (text: string) => saveCentralIdia(text, 'paragraph5'),
        preValue: book?.snowflakeStructure?.expansionToPage?.paragraph5 ?? '',
      },
    ],
  })

  return (
    <>
      <div className="flex w-full">
        <main className="py-4 min-w-[35rem] px-6 w-auto mx-auto max-w-[45rem]">
          <h2 className="text-3xl font-bold mb-4">Expansão para página</h2>
          <span className="text-sm text-justify">
            Após ter criado os 5 frases, o próximo passo no método de escrita
            Snowflake é expandir cada uma desses frases para um parágrafos
            inteiro. Aqui você deve complementar as frases, adicionando mais
            alguns detalhes sobre os acontecimentos.
          </span>

          <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

          {editorStateRef.current.paragraph1 && (
            <BlockEditor
              title="Paragrafo 1:"
              editor={Editors.paragraph1.editor}
            />
          )}

          {editorStateRef.current.paragraph2 && (
            <BlockEditor
              title="Paragrafo 2:"
              editor={Editors.paragraph2.editor}
            />
          )}

          {editorStateRef.current.paragraph3 && (
            <BlockEditor
              title="Paragrafo 3:"
              editor={Editors.paragraph3.editor}
            />
          )}

          {editorStateRef.current.paragraph4 && (
            <BlockEditor
              title="Paragrafo 4:"
              editor={Editors.paragraph4.editor}
            />
          )}

          {editorStateRef.current.paragraph5 && (
            <BlockEditor
              title="Paragrafo 5:"
              editor={Editors.paragraph5.editor}
            />
          )}
        </main>

        <SnowflakeFloatPreStructure
          title="Ao paragrafo"
          types={[
            {
              title: 'Frase 1',
              html: book?.snowflakeStructure?.expansionToParagraph?.phrase1,
            },
            {
              title: 'Frase 2',
              html: book?.snowflakeStructure?.expansionToParagraph?.phrase2,
            },
            {
              title: 'Frase 3',
              html: book?.snowflakeStructure?.expansionToParagraph?.phrase3,
            },
            {
              title: 'Frase 4',
              html: book?.snowflakeStructure?.expansionToParagraph?.phrase4,
            },
            {
              title: 'Frase 5',
              html: book?.snowflakeStructure?.expansionToParagraph?.phrase5,
            },
          ]}
        />
      </div>

      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  )
}
