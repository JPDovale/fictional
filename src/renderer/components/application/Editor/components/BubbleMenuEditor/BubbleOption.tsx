import { ReactNode } from 'react';
import { useTheme } from '@rHooks/useTheme';
import { tv } from 'tailwind-variants';
import { Theme } from '@rStores/useInterfaceStore';

export const bubbleOptionStyles = tv({
  base: 'p-2 text-sm flex items-center justify-center gap-1.5 leading-none font-medium ease-in-out duration-300',
  variants: {
    theme: {
      [Theme.DARK]:
        'text-text500 hover:text-text100 hover:bg-gray200 data-[active=true]:text-purple900 focus:text-text100 focus:bg-gray200',
      [Theme.LIGHT]:
        'text-text700 hover:text-text800 hover:bg-gray600 focus:text-text800 focus:bg-gray600 data-[active=true]:text-purple600 ',
      [Theme.SYSTEM]: '',
    },
  },
});

interface BubbleOptionProps {
  icon: ReactNode;
  isActive: boolean;
  handler: () => void;
}

export function BubbleOption({ icon, handler, isActive }: BubbleOptionProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={handler}
      data-active={isActive}
      className={bubbleOptionStyles({ theme })}
    >
      {icon}
    </button>
  );
}
