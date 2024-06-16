import {
  RxFontBold,
  RxFontItalic,
  RxQuote,
  RxStrikethrough,
} from 'react-icons/rx'
import { Editor } from '@tiptap/react'
import { useTheme } from '@rHooks/useTheme'
import { tv } from 'tailwind-variants'
import { Theme } from '@rStores/useInterfaceStore'
import { BubbleOption } from './BubbleOption'

const groupStyles = tv({
  base: 'flex border-r ',
  variants: {
    theme: {
      [Theme.DARK]: 'border-r-gray400',
      [Theme.LIGHT]: 'border-r-gray600',
      [Theme.SYSTEM]: '',
    },
  },
})

interface TextAlignersProps {
  editor: Editor
}

export function TextAligners({ editor }: TextAlignersProps) {
  const { theme } = useTheme()

  return (
    <div className={groupStyles({ theme })}>
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
