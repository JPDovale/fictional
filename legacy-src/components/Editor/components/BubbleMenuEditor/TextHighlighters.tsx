import { Editor } from '@tiptap/react'
import { useTheme } from '@hooks/useTheme'
import * as HoverCard from '@radix-ui/react-hover-card'
import { CaseUpper, PaintBucket } from 'lucide-react'
import { colors } from '@styles/colors'
import { textHighlightersStyles } from './styles'
import { BubbleOption } from './BubbleOption'
import { HighlighterOption } from './HighlighterOption'

interface TextHighlightersProps {
  editor: Editor
}

export function TextHighlighters({ editor }: TextHighlightersProps) {
  const { theme } = useTheme()

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <BubbleOption
          icon={<PaintBucket className="w-4 h-4" />}
          isActive={false}
          handler={() => {}}
        />
      </HoverCard.Trigger>

      <HoverCard.Content className={textHighlightersStyles({ theme })}>
        <span className="p-2 text-xs opacity-60">Cor do texto</span>
        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={!editor.isActive('textStyle')}
          handler={() => editor.chain().focus().unsetColor().run()}
          label="Padrão"
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.black,
          })}
          handler={() => editor.chain().focus().setColor(colors.black).run()}
          label={<span className="text-black p-0.5 rounded-sm">Preto</span>}
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.white,
          })}
          handler={() => editor.chain().focus().setColor(colors.white).run()}
          label={<span className="text-white p-0.5 rounded-sm">Branco</span>}
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance10,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance10).run()
          }
          label={
            <span className="text-importance10 p-0.5 rounded-sm">
              Roxo escuro
            </span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance9,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance9).run()
          }
          label={
            <span className="text-importance9 p-0.5 rounded-sm">Lilas</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance8,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance8).run()
          }
          label={
            <span className="text-importance8 p-0.5 rounded-sm">Vermelho</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance7,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance7).run()
          }
          label={
            <span className="text-importance7 p-0.5 rounded-sm">Pink</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance6,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance6).run()
          }
          label={
            <span className="text-importance6 p-0.5 rounded-sm">Rosa</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance5,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance5).run()
          }
          label={
            <span className="text-importance5 p-0.5 rounded-sm">Laranja</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance4,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance4).run()
          }
          label={
            <span className="text-importance4 p-0.5 rounded-sm">Amarelo</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance3,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance3).run()
          }
          label={
            <span className="text-importance3 p-0.5 rounded-sm">
              Verde escuro
            </span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance2,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance2).run()
          }
          label={
            <span className="text-importance2 p-0.5 rounded-sm">
              Verde claro
            </span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('textStyle', {
            color: colors.importance1,
          })}
          handler={() =>
            editor.chain().focus().setColor(colors.importance1).run()
          }
          label={
            <span className="text-importance1 p-0.5 rounded-sm">Azul</span>
          }
        />

        <span className="p-2 text-xs opacity-60">Fundo</span>
        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={!editor.isActive('highlight')}
          handler={() => editor.chain().focus().unsetHighlight().run()}
          label="Padrão"
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.black,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.black })
              .run()
          }
          label={<span className="bg-black p-0.5 rounded-sm">Preto</span>}
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.white,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.white })
              .run()
          }
          label={<span className="bg-white p-0.5 rounded-sm">Branco</span>}
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance10,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance10 })
              .run()
          }
          label={
            <span className="bg-importance10/70 p-0.5 rounded-sm">
              Roxo escuro
            </span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance9,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance9 })
              .run()
          }
          label={
            <span className="bg-importance9/70 p-0.5 rounded-sm">Lilas</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance8,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance8 })
              .run()
          }
          label={
            <span className="bg-importance8/70 p-0.5 rounded-sm">Vermelho</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance7,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance7 })
              .run()
          }
          label={
            <span className="bg-importance7/70 p-0.5 rounded-sm">Pink</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance6,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance6 })
              .run()
          }
          label={
            <span className="bg-importance6/70 p-0.5 rounded-sm">Rosa</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance5,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance5 })
              .run()
          }
          label={
            <span className="bg-importance5/70 p-0.5 rounded-sm">Laranja</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance4,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance4 })
              .run()
          }
          label={
            <span className="bg-importance4/70 p-0.5 rounded-sm">Amarelo</span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance3,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance3 })
              .run()
          }
          label={
            <span className="bg-importance3/70 p-0.5 rounded-sm">
              Verde escuro
            </span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance2,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance2 })
              .run()
          }
          label={
            <span className="bg-importance2/70 p-0.5 rounded-sm">
              Verde claro
            </span>
          }
        />

        <HighlighterOption
          icon={<CaseUpper className="w-4 h-4" />}
          isActive={editor.isActive('highlight', {
            color: colors.importance1,
          })}
          handler={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: colors.importance1 })
              .run()
          }
          label={
            <span className="bg-importance1/70 p-0.5 rounded-sm">Azul</span>
          }
        />
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
