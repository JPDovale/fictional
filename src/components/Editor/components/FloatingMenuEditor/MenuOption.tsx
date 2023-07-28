import { useTheme } from '@hooks/useTheme';
import { ReactNode } from 'react';
import { menuOptionWrapperStyles } from './styles';

interface MenuOptionProps {
  icon: ReactNode;
  title: string;
  description: string;
  handler: () => void;
}

export function MenuOption({
  icon,
  description,
  title,
  handler,
}: MenuOptionProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      className={menuOptionWrapperStyles({ theme })}
      onClick={handler}
    >
      {icon}
      <div className="flex-1 pr-2">
        <span className="text-sm font-bold">{title}</span>
        <span className="text-xs">{description}</span>
      </div>
    </button>
  );
}
