import { LucideIcon } from 'lucide-react';
import { useTheme } from '@hooks/useTheme';
import { snowflakeStepButtonStyles } from './styles';

interface SnowflakeStepButtonProps {
  Icon: LucideIcon;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export function SnowflakeStepButton({
  Icon,
  text,
  disabled = false,
  onClick,
}: SnowflakeStepButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      className={snowflakeStepButtonStyles({ theme, disabled })}
      onClick={() => !disabled && onClick()}
    >
      <div className="flex items-center gap-3">
        <Icon className="min-w-8 min-h-8 fill-purple900" />
        <span className="leading-none font-title text-xs">{text}</span>
      </div>
    </button>
  );
}
