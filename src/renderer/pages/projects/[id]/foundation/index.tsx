import { useEditor } from '@rHooks/useEditor'
import { BlockEditor } from '@rComponents/application/BlockEditor'
import { useProject } from '@rHooks/useProject'
import { useParams } from 'react-router-dom'

interface EditorState {
  foundation: string
  whatHappens: string
  whyHappens: string
  whereHappens: string
  whoHappens: string
}

export function ProjectFoundationPage() {
  const { projectId } = useParams()
  const { useFoundation } = useProject({ projectId: projectId as string })
  const { foundation, updateFoundation, isLoading, getTempPersistenceKey } =
    useFoundation()

  function updateFoundationOnDiff(key: keyof EditorState, value: string) {
    if (isLoading) return
    if (!foundation) return
    if (foundation[key] === value) return
    console.log(key, value)

    updateFoundation({ [key]: value })
  }

  const { editor: foundationEditor } = useEditor({
    preValueKey: getTempPersistenceKey('foundation'),
    onDiff: (value) => updateFoundationOnDiff('foundation', value),
  })

  const { editor: whatHappensEditor } = useEditor({
    preValueKey: getTempPersistenceKey('whatHappens'),
    onDiff: (value) => updateFoundationOnDiff('whatHappens', value),
  })

  const { editor: whyHappensEditor } = useEditor({
    preValueKey: getTempPersistenceKey('whyHappens'),
    onDiff: (value) => updateFoundationOnDiff('whyHappens', value),
  })

  const { editor: whoHappensEditor } = useEditor({
    preValueKey: getTempPersistenceKey('whoHappens'),
    onDiff: (value) => updateFoundationOnDiff('whoHappens', value),
  })

  const { editor: whereHappensEditor } = useEditor({
    preValueKey: getTempPersistenceKey('whereHappens'),
    onDiff: (value) => updateFoundationOnDiff('whereHappens', value),
  })

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto py-4">
      <h2 className="text-3xl font-bold mb-4">Fundação</h2>
      <span className="text-sm text-justify bg-white/10 p-4 rounded-lg backdrop-blur-[3px] shadow-xl border border-white/30 border-b-black/30 border-r-black/30 font-bold">
        A fundação é primeiro e mais importante bloco de uma história, uma vez
        que basta uma fundação bem definida, o resto gira em torno dessa
        fundação de uma forma elementar. Personagens, acontecimentos, mundos
        inteiros derivam da fundação de uma história e se essa fundação estiver
        mal definida, todo está comprometido.
      </span>

      {foundationEditor && (
        <BlockEditor
          title="Fundamento"
          content={
            <span className="text-sm text-justify">
              Se refere ao princípio ou razão básica que serve de alicerce para
              uma teoria, argumento, crença ou prática. Neste sentido, um
              fundamento é a base lógica ou o motivo pelo qual algo existe ou é
              feito.
              <br />
              <br />
              Considerando que o fundamento é o bloco base da Fundação, devemos
              o deixar claro, objetivo, conciso e direto ao ponto, sem fazer
              menções a personagens, a mundos ou cenas específicas...
              <br /> <br />
              De uma causa para a ideia central, um motivo do porquê aquilo é do
              jeito que é. Então coloque um verbo que motive a busca por algo,
              seja o que for e assim essa frase terá vida própria.
              <br /> <br />A ideia é se concentrar na filosofia da história.
            </span>
          }
          editor={foundationEditor}
        />
      )}

      {whatHappensEditor && (
        <BlockEditor title="O que acontece?" editor={whatHappensEditor} />
      )}

      {whyHappensEditor && (
        <BlockEditor title="Por que acontece?" editor={whyHappensEditor} />
      )}

      {whereHappensEditor && (
        <BlockEditor title="Onde acontece?" editor={whereHappensEditor} />
      )}

      {whoHappensEditor && (
        <BlockEditor title="Com quem acontece?" editor={whoHappensEditor} />
      )}
    </main>
  )
}
