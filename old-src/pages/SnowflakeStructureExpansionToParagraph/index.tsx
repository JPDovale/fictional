import { BlockEditor } from '@components/BlockEditor'
import { SnowflakeFloatPreStructure } from '@components/SnowflakeStructureComponents/SnowflakeFloatPreStructure'
import { SnowflakeStructureNavigate } from '@components/SnowflakeStructureComponents/SnowflakeStructureNavigation'
import { useEditor } from '@hooks/useEditor'
import { useBooks } from '@store/Books'
import { useProjects } from '@store/Projects'
import { isEqual } from 'lodash'
import { Info } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface EditorStateRef {
  phrase1: string | null
  phrase2: string | null
  phrase3: string | null
  phrase4: string | null
  phrase5: string | null
}

export function SnowflakeStructureExpansionToParagraphPage() {
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
    phrase1:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToParagraph?.phrase1) ?? '<p></p>',
    phrase2:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToParagraph?.phrase2) ?? '<p></p>',
    phrase3:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToParagraph?.phrase3) ?? '<p></p>',
    phrase4:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToParagraph?.phrase4) ?? '<p></p>',
    phrase5:
      (isLoading
        ? '<p></p>'
        : book?.snowflakeStructure?.expansionToParagraph?.phrase5) ?? '<p></p>',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const currentExpansionToParagraph =
        book?.snowflakeStructure?.expansionToParagraph

      if (
        !isLoading &&
        book &&
        !isEqual(currentExpansionToParagraph, editorStateRef.current)
      ) {
        updateSnowflakeStructure({
          bookId: book.id,
          phrase1: editorStateRef.current.phrase1,
          phrase2: editorStateRef.current.phrase2,
          phrase3: editorStateRef.current.phrase3,
          phrase4: editorStateRef.current.phrase4,
          phrase5: editorStateRef.current.phrase5,
        })
      }
    }, 1000 * 2)

    return () => clearInterval(interval)
  }, [book, updateSnowflakeStructure, isLoading])

  function saveCentralIdia(
    text: string,
    id: 'phrase1' | 'phrase2' | 'phrase3' | 'phrase4' | 'phrase5',
  ) {
    editorStateRef.current[id] = text
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'phrase1',
        onUpdate: (text: string) => saveCentralIdia(text, 'phrase1'),
        preValue: book?.snowflakeStructure?.expansionToParagraph?.phrase1 ?? '',
      },
      {
        id: 'phrase2',
        onUpdate: (text: string) => saveCentralIdia(text, 'phrase2'),
        preValue: book?.snowflakeStructure?.expansionToParagraph?.phrase2 ?? '',
      },
      {
        id: 'phrase3',
        onUpdate: (text: string) => saveCentralIdia(text, 'phrase3'),
        preValue: book?.snowflakeStructure?.expansionToParagraph?.phrase3 ?? '',
      },
      {
        id: 'phrase4',
        onUpdate: (text: string) => saveCentralIdia(text, 'phrase4'),
        preValue: book?.snowflakeStructure?.expansionToParagraph?.phrase4 ?? '',
      },
      {
        id: 'phrase5',
        onUpdate: (text: string) => saveCentralIdia(text, 'phrase5'),
        preValue: book?.snowflakeStructure?.expansionToParagraph?.phrase5 ?? '',
      },
    ],
  })

  return (
    <>
      <div className="flex w-full">
        <main className="py-4 min-w-[35rem] px-6 w-auto mx-auto max-w-[45rem]">
          <h2 className="text-3xl font-bold mb-4">Expansão para paragrafo</h2>
          <span className="text-sm text-justify">
            Após ter criado o resumo de uma frase, o próximo passo no método de
            escrita Snowflake é expandir essa ideia central em um resumo de
            cinco frases. Nesse estágio, você começará a adicionar mais detalhes
            à história, apresentando elementos adicionais da trama e
            desenvolvendo os principais personagens.
            <br />
            <br />
            As cinco frases devem ser construídas de maneira a formar uma
            sinopse mais completa e detalhada, mas ainda assim de forma
            resumida. Cada frase deve contribuir para o desenvolvimento da
            narrativa e permitir que você tenha uma visão mais clara dos eventos
            e da progressão da história. narrativa.
            <br />
            <br />
            Esse resumo mais extenso ajuda a esclarecer os pontos-chave da
            trama, os conflitos principais e a dinâmica dos personagens. Além
            disso, ele também ajuda a visualizar melhor o início, o meio e o fim
            da história, fornecendo uma estrutura mais sólida para a escrita
            subsequente.
            <br />
            <br />
            Deixando o mouse por um tempo em cima do ícone{' '}
            <Info className="inline w-4 h-4" /> ao lado do título de cada editor
            você pode obter mais informações sobre cada frase
          </span>

          <h2 className="font-bold text-xl uppercase mt-12">Sua vez!</h2>

          {editorStateRef.current.phrase1 && (
            <BlockEditor
              title="Frase 1:"
              content={
                <>
                  A primeira frase deve incluir o cenário inicial da história, e
                  um &apos;Arranque&apos; comumente chamado de chamado a
                  aventura, que quebra o status quo do personagem principal.
                  <br />
                  <br />
                  Exemplo:
                  <br />
                  <span className="italic">
                    &quot;Em uma pequena vila isolada, a jovem aprendiz de
                    feiticeira Anna vive sob a tutela do sábio mago Eric e sonha
                    com uma vida de aventuras e magia. Quando eventos
                    misteriosos e sombrios começam a ameaçar o reino, Anna
                    descobre que é a última herdeira de uma linhagem antiga de
                    feiticeiros e que é a única capaz de enfrentar o mal antigo
                    que ressurge.&quot;
                  </span>
                </>
              }
              editor={Editors.phrase1.editor}
            />
          )}

          {editorStateRef.current.phrase2 && (
            <BlockEditor
              title="Frase 2:"
              content={
                <>
                  A segunda frase deve incluir o primeiro pico dramático da
                  história.
                  <br />
                  <br />
                  Exemplo:
                  <br />
                  <span className="italic">
                    &quot;Determinada a salvar seu reino e proteger as pessoas
                    que ama, Anna parte em uma jornada perigosa em busca dos
                    três artefatos mágicos necessários para enfrentar o mal,
                    contando com a ajuda de seus amigos, o corajoso guerreiro
                    Thomas e a astuta curandeira Lydia&quot;
                  </span>
                </>
              }
              editor={Editors.phrase2.editor}
            />
          )}

          {editorStateRef.current.phrase3 && (
            <BlockEditor
              title="Frase 3:"
              content={
                <>
                  A terceira frase deve incluir o segundo pico dramático da
                  história.
                  <br />
                  <br />
                  Exemplo:
                  <br />
                  <span className="italic">
                    &quot;Enquanto viaja por terras desconhecidas, Anna aprimora
                    seus conhecimentos de magia ancestral com a orientação do
                    enigmático Mestre Merlin, mas também é confrontada com
                    segredos sombrios de seu passado que a fazem questionar sua
                    verdadeira força interior.&quot;
                  </span>
                </>
              }
              editor={Editors.phrase3.editor}
            />
          )}

          {editorStateRef.current.phrase4 && (
            <BlockEditor
              title="Frase 4:"
              content={
                <>
                  A quarta frase deve incluir o terceiro e último pico dramático
                  da história.
                  <br />
                  <br />
                  Exemplo:
                  <br />
                  <span className="italic">
                    &quot;Com o tempo se esgotando, Anna e seus amigos se
                    deparam com perigos inimagináveis, mas sua determinação é
                    fortalecida pelas conexões que desenvolveram ao longo da
                    jornada.&quot;
                  </span>
                </>
              }
              editor={Editors.phrase4.editor}
            />
          )}

          {editorStateRef.current.phrase5 && (
            <BlockEditor
              title="Frase 5:"
              content={
                <>
                  A quinta e última frase deve incluir o desfecho da história.
                  <br />
                  <br />
                  Exemplo:
                  <br />
                  <span className="italic">
                    &quot;No confronto épico, Anna enfrenta o mal antigo e, ao
                    superar seus medos internos, ela revela todo o seu potencial
                    como feiticeira, determinando o destino do reino e abraçando
                    seu papel como guardiã do equilíbrio místico do mundo.&quot;
                  </span>
                </>
              }
              editor={Editors.phrase5.editor}
            />
          )}
        </main>

        <SnowflakeFloatPreStructure
          title="Ideia central"
          types={[
            {
              html: book?.snowflakeStructure?.centralIdia,
            },
          ]}
        />
      </div>

      {!project?.features['multi-book'] && <SnowflakeStructureNavigate />}
    </>
  )
}
