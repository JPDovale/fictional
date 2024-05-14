import { FloatingMenu, Editor } from '@tiptap/react'
import { RxText } from 'react-icons/rx'
import { Heading1, Heading2, Heading3, Heading4, List } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import * as State from '@tiptap/pm/state'
import { tv } from 'tailwind-variants'
import { Theme } from '@rStores/useInterfaceStore'
import { useTheme } from '@rHooks/useTheme'
import { MenuOption } from './MenuOption'

export const floatingMenuStyles = tv({
  base: 'shadow-lg border shadow-semiTransparentBack rounded-md overflow-hidden flex flex-col p-2 gap-1',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray300 border-gray400',
      [Theme.LIGHT]: 'bg-gray700 border-gray600',
      [Theme.SYSTEM]: '',
    },
  },
})

interface FloatingMenuEditorProps {
  editor: Editor | null
}

interface ItShouldShowProps {
  state: State.EditorState
}

export function FloatingMenuEditor({ editor }: FloatingMenuEditorProps) {
  const { theme } = useTheme()

  if (!editor) return null

  function itShouldShow({ state }: ItShouldShowProps): boolean {
    const { $from } = state.selection
    const currentLineText = $from.nodeBefore?.textContent

    return currentLineText === '/' && $from.nodeAfter?.textContent === undefined
  }

  return (
    <Popover.Root open>
      <Popover.Portal>
        <Popover.Content>
          <FloatingMenu
            className={floatingMenuStyles({ theme })}
            editor={editor}
            shouldShow={itShouldShow}
          >
            <MenuOption
              title="Texto"
              description="Comece com um texto simples"
              icon={<RxText className="w-10 h-10 p-2" />}
              handler={() => editor.chain().focus().clearContent().run()}
            />

            <MenuOption
              title="Titulo 1"
              description="Insira um bloco de titulo primário"
              icon={<Heading1 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }}
            />

            <MenuOption
              title="Titulo 2"
              description="Insira um bloco de titulo secundário"
              icon={<Heading2 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }}
            />

            <MenuOption
              title="Titulo 3"
              description="Insira um bloco de titulo terciário"
              icon={<Heading3 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }}
            />

            <MenuOption
              title="Titulo 4"
              description="Insira um bloco de titulo pequeno"
              icon={<Heading4 className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }}
            />

            <MenuOption
              title="Lista"
              description="Insira uma lista numerada"
              icon={<List className="w-10 h-10 p-2" />}
              handler={() => {
                editor.chain().focus().toggleOrderedList().run()
              }}
            />
          </FloatingMenu>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
