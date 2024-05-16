import { Editor } from '@components/Editor'
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation'
import { useEditor } from '@hooks/useEditor'
import { useBooks } from '@store/Books'
import { useProjects } from '@store/Projects'
import { useEffect, useRef } from 'react'

export function SnowflakeStructureCentralIdiaPage() {
  const { project, updateSnowflakeStructure } = useProjects((state) => ({
    project: state.currentProject,
    updateSnowflakeStructure: state.updateSnowflakeStructure,
  }))
  const { bookSelected, isLoading } = useBooks((state) => ({
    bookSelected: state.currentBook,
    isLoading: state.isLoading,
  }))

  const book = bookSelected || project?.books[0]
  const editorStateRef = useRef<string>(
    (isLoading ? '<p></p>' : book?.snowflakeStructure?.centralIdia) ??
      '<p></p>',
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const currentCentralIdia = book?.snowflakeStructure?.centralIdia

      if (!isLoading && book && currentCentralIdia !== editorStateRef.current) {
        updateSnowflakeStructure({
          bookId: book.id,
          centralIdia: editorStateRef.current,
        })
      }
    }, 1000 * 2)

    return () => clearInterval(interval)
  }, [book, updateSnowflakeStructure, isLoading])

  function saveCentralIdia(text: string) {
    editorStateRef.current = text
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'centralIdia',
        onUpdate: saveCentralIdia,
        preValue: book?.snowflakeStructure?.centralIdia ?? '',
      },
    ],
  })

  return (
    <>
      <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
        <h2 className="text-3xl font-bold mb-4">Ideia central</h2>
        <span className="text-sm text-justify">
          O primeiro passo do método de escrita Snowflake é resumir sua história
          inteira em uma única frase. Neste estágio, você precisa destilar a
          essência da sua narrativa em uma declaração concisa e impactante. Essa
          frase deve capturar a ideia central, o conceito principal ou o tema da
          sua história de forma clara e sucinta.
          <br />
          <br />
          Essa etapa é essencial porque ajuda você a estabelecer uma direção
          clara para sua história desde o início. Ao criar um resumo de uma
          frase, você está definindo a fundação sobre a qual toda a trama será
          construída. Esse resumo funcionará como um guia fundamental que irá
          orientar seu processo criativo à medida que você desenvolve a
          narrativa.
          <br />
          <br />
          Exemplo:
          <br />
          <span className="italic">
            &quot;Uma jovem aprendiz de feiticeira descobre que é a única capaz
            de enfrentar um mal antigo que ressurge para ameaçar o reino.&quot;
          </span>
          <br />
          <br />
          Nesta frase, a ideia central da história é claramente estabelecida:
          uma jovem aprendiz de feiticeira é a única esperança contra a ameaça
          de um mal antigo que retorna para colocar em perigo o reino. A partir
          dessa frase, você pode começar a expandir os detalhes em resumos
          sucessivos, criando camadas cada vez mais complexas da história até
          chegar ao esboço completo e, finalmente, ao texto completo da
          narrativa.
          <br />
          <br />O resumo de uma frase é como a semente a partir da qual a
          história crescerá, assim como um floco de neve se desenvolve a partir
          de um núcleo único. Com uma ideia central clara desde o início, você
          terá uma base sólida para construir sua história de maneira
          estruturada e envolvente.
        </span>

        <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

        <Editor editor={Editors.centralIdia.editor} />
      </main>
      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  )
}
