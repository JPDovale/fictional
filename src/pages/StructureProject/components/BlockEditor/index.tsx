import { Editor } from '@components/Editor';
import * as HoverCard from '@radix-ui/react-hover-card';
import { InfoIcon } from 'lucide-react';
import { useTheme } from '@hooks/useTheme';
import { ReactNode } from 'react';
import { Editor as EditorTipTap } from '@tiptap/react';
import {
  blockEditorTitleStyles,
  hoverContentStyles,
  hoverInnerContentStyles,
} from './styles';

interface BlockEditorProps {
  title: string;
  content: ReactNode;
  editor: EditorTipTap | null;
}

export function BlockEditor({ content, title, editor }: BlockEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="pt-16 min-w-[720px] max-w-[720px] w-full flex flex-col">
      <HoverCard.Root>
        <h1 className={blockEditorTitleStyles({ theme })}>
          {title}
          <HoverCard.Trigger>
            <InfoIcon size={16} className="cursor-pointer" />
          </HoverCard.Trigger>
        </h1>

        <HoverCard.Portal>
          <HoverCard.Content className={hoverContentStyles({ theme })}>
            <span className={hoverInnerContentStyles({ theme })}>
              {content}
            </span>
            <HoverCard.Arrow className="fill-purple900" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>

      <Editor editor={editor} />
    </div>
  );
}
