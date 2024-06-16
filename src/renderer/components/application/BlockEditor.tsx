import * as HoverCard from '@radix-ui/react-hover-card';
import { InfoIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Editor as EditorTipTap } from '@tiptap/react';
import { useTheme } from '@rHooks/useTheme';
import { tv } from 'tailwind-variants';
import { Theme } from '@rStores/useInterfaceStore';
import { Editor } from './Editor';
import { EditorMenuOption } from './Editor/components/FloatingMenuEditor';

const blockEditorTitleStyles = tv({
  base: 'text-start flex gap-3 leading-none items-center font-bold uppercase ',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text300/50',
      [Theme.LIGHT]: 'text-text800/40',
      [Theme.SYSTEM]: '',
    },
  },
});

const hoverContentStyles = tv({
  base: 'relative max-w-lg p-2 z-50 rounded-sm border border-purple900 shadow-lg shadow-semiTransparentBack',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray200',
      [Theme.LIGHT]: 'bg-gray800',
      [Theme.SYSTEM]: '',
    },
  },
});

const hoverInnerContentStyles = tv({
  base: 'text-xs text-justify font-bold',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text300/80',
      [Theme.LIGHT]: 'text-text800/80',
      [Theme.SYSTEM]: '',
    },
  },
});

interface BlockEditorProps {
  title?: string;
  content?: ReactNode;
  editor: EditorTipTap | null;
  menuOptions?: EditorMenuOption[];
  isLoading?: boolean;
}

export function BlockEditor({
  content,
  title = '',
  editor,
  menuOptions,
  isLoading,
}: BlockEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="pt-16  w-full flex flex-col">
      {(content || title) && (
        <HoverCard.Root>
          <h1 className={blockEditorTitleStyles({ theme })}>
            {title}
            {content && (
              <HoverCard.Trigger>
                <InfoIcon size={16} className="cursor-pointer" />
              </HoverCard.Trigger>
            )}
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
      )}

      <Editor
        editor={editor}
        menuOptions={menuOptions ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
