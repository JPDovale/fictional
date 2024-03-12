import {
  RxTextAlignCenter,
  RxTextAlignJustify,
  RxTextAlignLeft,
  RxTextAlignRight,
} from 'react-icons/rx'
import { Editor } from '@tiptap/react'
import { useTheme } from '@rHooks/useTheme'
import { Theme } from '@rStores/useInterfaceStore'
import { tv } from 'tailwind-variants'
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

interface TextTransformersProps {
  editor: Editor
}

export function TextTransformers({ editor }: TextTransformersProps) {
  const { theme } = useTheme()

  return (
    <div className={groupStyles({ theme })}>
      <BubbleOption
        icon={<RxTextAlignLeft className="w-4 h-4" />}
        isActive={editor.isActive({ textAlign: 'left' })}
        handler={() => editor.chain().focus().setTextAlign('left').run()}
      />

      <BubbleOption
        icon={<RxTextAlignCenter className="w-4 h-4" />}
        isActive={editor.isActive({ textAlign: 'center' })}
        handler={() => editor.chain().focus().setTextAlign('center').run()}
      />

      <BubbleOption
        icon={<RxTextAlignRight className="w-4 h-4" />}
        isActive={editor.isActive({ textAlign: 'right' })}
        handler={() => editor.chain().focus().setTextAlign('right').run()}
      />

      <BubbleOption
        icon={<RxTextAlignJustify className="w-4 h-4" />}
        isActive={editor.isActive({ textAlign: 'justify' })}
        handler={() => editor.chain().focus().setTextAlign('justify').run()}
      />
    </div>
  )
}
