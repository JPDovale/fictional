import { useTheme } from '@hooks/useTheme'
import { BubbleMenu, Editor } from '@tiptap/react'
import * as Popover from '@radix-ui/react-popover'
import { bubbleMenuWrapperStyles } from './styles'

import { TextTransformers } from './TextTransformers'
import { TextAligners } from './TextAligners'
import { TextHighlighters } from './TextHighlighters'

interface BubbleMenuEditorProps {
  editor: Editor | null
}

export function BubbleMenuEditor({ editor }: BubbleMenuEditorProps) {
  const { theme } = useTheme()

  if (!editor) return null

  return (
    <Popover.Root open>
      <Popover.Portal>
        <Popover.Content>
          <BubbleMenu
            className={bubbleMenuWrapperStyles({ theme })}
            editor={editor}
          >
            <TextTransformers editor={editor} />
            <TextAligners editor={editor} />
            <TextHighlighters editor={editor} />
          </BubbleMenu>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
