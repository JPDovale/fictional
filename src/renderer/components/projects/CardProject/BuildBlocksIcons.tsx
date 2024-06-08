import { BuildBlocksJson } from '@modules/projects/valueObjects/BuildBlocks';
import { useBuildBlocks } from '@rHooks/useBuildBlocks';
import { useTheme } from '@rHooks/useTheme';

interface BuildBlocsIconsProps {
  buildBlocks: BuildBlocksJson;
}

export function BuildBlocksIcons({ buildBlocks }: BuildBlocsIconsProps) {
  const { theme } = useTheme();
  const { getIcon } = useBuildBlocks(buildBlocks);

  const buildBlocksPair = Object.entries(buildBlocks);

  return (
    <div
      data-theme={theme}
      className="flex gap-1 items-center justify-center py-2 w-full border-t border-gray800 data-[theme=dark]:border-gray500/50"
    >
      {buildBlocksPair.map(([key, value]) => {
        if (!value) return null;

        const Icon = getIcon(key);

        return (
          <Icon
            data-theme={theme}
            className="bg-purple900 text-text100 p-1 rounded-full data-[theme=dark]:bg-purple600 data-[theme=dark]:shadow-defaultDark"
            key={key}
            size={24}
          />
        );
      })}
    </div>
  );
}

BuildBlocksIcons.displayName = 'CardProject.BuildBlocksIcons';
