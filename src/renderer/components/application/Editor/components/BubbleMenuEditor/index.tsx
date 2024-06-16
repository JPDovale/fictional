import { BubbleMenu, Editor } from '@tiptap/react';
import { useTheme } from '@rHooks/useTheme';
import { tv } from 'tailwind-variants';
import { Theme } from '@rStores/useInterfaceStore';
import { TextTransformers } from './TextTransformers';
import { TextAligners } from './TextAligners';
import { TextHighlighters } from './TextHighlighters';
import {
  Popover,
  PopoverContent,
  PopoverPortal,
} from '@rComponents/ui/popover';

const bubbleMenuWrapperStyles = tv({
  base: 'shadow-lg border shadow-semiTransparentBack rounded-md overflow-hidden flex',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray300 border-gray400',
      [Theme.LIGHT]: 'bg-gray700 border-gray600',
      [Theme.SYSTEM]: '',
    },
  },
});

interface BubbleMenuEditorProps {
  editor: Editor | null;
}

export function BubbleMenuEditor({ editor }: BubbleMenuEditorProps) {
  const { theme } = useTheme();

  if (!editor) return null;

  return (
    <Popover open>
      <PopoverPortal>
        <PopoverContent>
          <BubbleMenu
            tippyOptions={{
              placement: 'top-start',
              hideOnClick: true,
            }}
            className={bubbleMenuWrapperStyles({ theme })}
            editor={editor}
          >
            <TextTransformers editor={editor} />
            <TextAligners editor={editor} />
            <TextHighlighters editor={editor} />
          </BubbleMenu>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
