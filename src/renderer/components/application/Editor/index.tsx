import './styles.css'
import { EditorContent, Editor as EditorTipTap } from '@tiptap/react'
import { useTheme } from '@rHooks/useTheme'
import { tv } from 'tailwind-variants'
import { Theme } from '@rStores/useInterfaceStore'
import { FloatingMenuEditor } from './components/FloatingMenuEditor'
import { BubbleMenuEditor } from './components/BubbleMenuEditor'

const editorStyles = tv({
  base: 'min-w-[45rem] max-w-[45rem] prose prose-purple prose-sm group',
  variants: {
    theme: {
      [Theme.DARK]: 'prose-invert',
      [Theme.LIGHT]: '',
      [Theme.SYSTEM]: '',
    },
  },
})

interface EditorProps {
  editor: EditorTipTap | null
}

export function Editor({ editor }: EditorProps) {
  const { theme } = useTheme()

  // const { findPerson } = usePersons((state) => ({
  //   findPerson: state.findPerson,
  // }));

  if (!editor) return null

  function handleDoubleClick() {
    // if (!editor) return
    // const { $from } = editor.state.selection
    // const node = $from.nodeBefore?.toString()
    // if (node !== 'mention') return
    // const mention = $from.nodeBefore?.attrs.id as string
    // const idOfMention = mention.split('<==>')[1]
    // const person = findPerson(idOfMention)
    // if (person) {
    //   setPathname({
    //     routerParameterized: RoutesAvailable.projectPerson.to(
    //       person.projectId,
    //       person.id,
    //     ),
    //   })
    // }
  }

  return (
    <>
      <EditorContent
        data-theme={theme}
        className={editorStyles({ theme })}
        editor={editor}
        onDoubleClick={handleDoubleClick}
      />
      <FloatingMenuEditor editor={editor} />
      <BubbleMenuEditor editor={editor} />
    </>
  )
}
