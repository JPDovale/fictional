import {
  RxFontBold,
  RxFontItalic,
  RxQuote,
  RxStrikethrough,
} from 'react-icons/rx'
import { Editor } from '@tiptap/react'
import { useTheme } from '@hooks/useTheme'
import { BubbleOption } from './BubbleOption'
import { GroupStyles } from './styles'

interface TextAlignersProps {
  editor: Editor
}

export function TextAligners({ editor }: TextAlignersProps) {
  const { theme } = useTheme()

  return (
    <div className={GroupStyles({ theme })}>
      <BubbleOption
        icon={<RxFontBold className="w-4 h-4" />}
        isActive={editor.isActive('bold')}
        handler={() => editor.chain().focus().toggleBold().run()}
      />

      <BubbleOption
        icon={<RxFontItalic className="w-4 h-4" />}
        isActive={editor.isActive('italic')}
        handler={() => editor.chain().focus().toggleItalic().run()}
      />

      <BubbleOption
        icon={<RxStrikethrough className="w-4 h-4" />}
        isActive={editor.isActive('strike')}
        handler={() => editor.chain().focus().toggleStrike().run()}
      />

      <BubbleOption
        icon={<RxQuote className="w-4 h-4" />}
        isActive={editor.isActive('blockquote')}
        handler={() => editor.chain().focus().toggleBlockquote().run()}
      />
    </div>
  )
}
