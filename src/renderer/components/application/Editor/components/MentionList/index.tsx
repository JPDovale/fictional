import { SuggestionProps } from '@tiptap/suggestion';
import { VenetianMask } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useTheme } from '@rHooks/useTheme';
import { tv } from 'tailwind-variants';
import { Theme } from '@rStores/useInterfaceStore';

const mentionListStyles = tv({
  base: ' w-72 flex flex-col gap-0.5 border-purple900 border p-1 rounded-md shadow-xl ',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray200',
      [Theme.LIGHT]: 'bg-gray800',
      [Theme.SYSTEM]: '',
    },
  },
});

const mentionSelectStyles = tv({
  base: 'flex leading-none px-2 py-0.5  text-xs items-center gap-2 rounded-md ease-in-out duration-300',
  variants: {
    theme: {
      [Theme.DARK]: 'text-text100 hover:bg-gray400 focus:bg-gray400',
      [Theme.LIGHT]: 'text-text800 hover:bg-gray600 focus:bg-gray600',
      [Theme.SYSTEM]: '',
    },
  },
});

export const MentionList = forwardRef<HTMLElement, SuggestionProps>(
  (props, ref) => {
    const { theme } = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle<HTMLElement, any>(ref, () => ({
      onKeyDown: ({ event }: { event: any }) => {
        if (event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <Popover.Root open>
        <Popover.Content asChild>
          <div className={mentionListStyles({ theme })}>
            {props.items.length ? (
              props.items.map((item: string, index) => (
                <button
                  type="button"
                  className={mentionSelectStyles({ theme })}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => selectItem(index)}
                >
                  <VenetianMask className="w-5 h-5 fill-purple900" />
                  <span>
                    {item.split('<==>')[0]}
                    {item.split('<==>')[2]}
                  </span>
                </button>
              ))
            ) : (
              <div
                data-theme={theme}
                className="text-text100 data-[theme=light]:text-text800 leading-none px-2 py-0.5 flex text-xs items-center"
              >
                No result
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  }
);
