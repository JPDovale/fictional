import {
  RxTextAlignCenter,
  RxTextAlignJustify,
  RxTextAlignLeft,
  RxTextAlignRight,
} from 'react-icons/rx'
import { Editor } from '@tiptap/react'
import { useTheme } from '@hooks/useTheme'
import { BubbleOption } from './BubbleOption'
import { GroupStyles } from './styles'

interface TextTransformersProps {
  editor: Editor
}

export function TextTransformers({ editor }: TextTransformersProps) {
  const { theme } = useTheme()

  return (
    <div className={GroupStyles({ theme })}>
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
