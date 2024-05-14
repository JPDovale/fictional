import { ReactNode } from 'react';
import { useTheme } from '@hooks/useTheme';
import { highlighterOptionStyles } from './styles';

interface HighlighterOptionProps {
  icon: ReactNode;
  label: ReactNode;
  isActive: boolean;
  handler: () => void;
}

export function HighlighterOption({
  icon,
  handler,
  isActive,
  label,
}: HighlighterOptionProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={handler}
      data-active={isActive}
      className={highlighterOptionStyles({ theme })}
    >
      {icon}
      {label}
    </button>
  );
}
