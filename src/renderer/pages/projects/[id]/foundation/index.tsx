import { useEditor } from '@rHooks/useEditor'
import { BlockEditor } from '@rComponents/application/BlockEditor'
import { useProject } from '@rHooks/useProject'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { isEqual } from 'lodash'

interface EditorRefState {
  foundation: string
  whatHappens: string
  whyHappens: string
  whereHappens: string
  whoHappens: string
}
interface UpdateStateRefProps {
  id: keyof EditorRefState
  value: string
}

export function ProjectFoundationPage() {
  const { projectId } = useParams()
  const { useFoundation } = useProject({ projectId: projectId as string })
  const { foundation, updateFoundation } = useFoundation()

  const stateRef = useRef<EditorRefState>({
    foundation: foundation?.foundation ?? '<p></p>',
    whoHappens: foundation?.whoHappens ?? '<p></p>',
    whyHappens: foundation?.whyHappens ?? '<p></p>',
    whatHappens: foundation?.whatHappens ?? '<p></p>',
    whereHappens: foundation?.whereHappens ?? '<p></p>',
  })

  function updateStateRef({ id, value }: UpdateStateRefProps) {
    stateRef.current[id] = value
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'foundation',
        onUpdate: (v) => updateStateRef({ id: 'foundation', value: v }),
        preValue: stateRef.current.foundation,
      },
      {
        id: 'whatHappens',
        onUpdate: (v) => updateStateRef({ id: 'whatHappens', value: v }),
        preValue: stateRef.current.whatHappens,
      },
      {
        id: 'whyHappens',
        onUpdate: (v) => updateStateRef({ id: 'whyHappens', value: v }),
        preValue: stateRef.current.whyHappens,
      },
      {
        id: 'whereHappens',
        onUpdate: (v) => updateStateRef({ id: 'whereHappens', value: v }),
        preValue: stateRef.current.whereHappens,
      },
      {
        id: 'whoHappens',
        onUpdate: (v) => updateStateRef({ id: 'whoHappens', value: v }),
        preValue: stateRef.current.whoHappens,
      },
    ],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (foundation) {
        const initialFoundationState: EditorRefState = {
          foundation: foundation.foundation,
          whoHappens: foundation.whoHappens,
          whyHappens: foundation.whyHappens,
          whatHappens: foundation.whatHappens,
          whereHappens: foundation.whereHappens,
        }

        if (isEqual(initialFoundationState, stateRef.current)) return

        updateFoundation(stateRef.current)
      }
    }, 1000 * 2)
    return () => clearInterval(interval)
  }, [foundation, updateFoundation])

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

      {Editors.foundation.editor && (
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
          editor={Editors.foundation.editor}
        />
      )}

      {Editors.whatHappens.editor && (
        <BlockEditor
          title="O que acontece?"
          editor={Editors.whatHappens.editor}
        />
      )}

      {Editors.whyHappens.editor && (
        <BlockEditor
          title="Por que acontece?"
          editor={Editors.whyHappens.editor}
        />
      )}

      {Editors.whereHappens.editor && (
        <BlockEditor
          title="Onde acontece?"
          editor={Editors.whereHappens.editor}
        />
      )}

      {Editors.whoHappens.editor && (
        <BlockEditor
          title="Com quem acontece?"
          editor={Editors.whoHappens.editor}
        />
      )}
    </main>
  )
}
