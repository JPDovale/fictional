import { ReactNode } from 'react';
import { useTheme } from '@hooks/useTheme';
import { bubbleOptionStyles } from './styles';

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
