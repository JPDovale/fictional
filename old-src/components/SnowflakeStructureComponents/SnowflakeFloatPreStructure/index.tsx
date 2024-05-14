import { useTheme } from '@hooks/useTheme';
import { snowflakeStructurePreFloat } from './styles';

interface SnowflakeFloatPreStructureProps {
  title: string;
  types: Array<{
    title?: string;
    html: string | null | undefined;
  }>;
}

export function SnowflakeFloatPreStructure({
  title,
  types,
}: SnowflakeFloatPreStructureProps) {
  const { theme } = useTheme();

  return (
    <div className="min-w-[18rem] max-w-[18rem]">
      <div className={snowflakeStructurePreFloat({ theme })}>
        <span className="uppercase font-title text-center text-lg">
          {title}
        </span>

        {types.map((type) => (
          <div key={type.html}>
            {type.title && (
              <span className="text-bold uppercase text-xs opacity-50">
                {type.title}:
              </span>
            )}
            <div
              data-theme={theme}
              className="prose prose-sm data-[theme=dark]:prose-invert text-xs"
              dangerouslySetInnerHTML={{ __html: type.html ?? '' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
