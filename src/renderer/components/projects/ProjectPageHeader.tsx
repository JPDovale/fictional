import { useProject } from '@rHooks/useProject';
import { useTheme } from '@rHooks/useTheme';
import { Theme } from '@rStores/useInterfaceStore';
import { HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const headerStyles = tv({
  base: 'px-2 h-6 flex items-center gap-1 fixed w-full max-w-full top-0 z-50',
  variants: {
    theme: {
      [Theme.DARK]: 'bg-gray200',
      [Theme.LIGHT]: 'bg-gray800 ',
      [Theme.SYSTEM]: '',
    },
  },
});

const pathStyles = tv({
  base: 'text-xxs leading-none font-bold opacity-60 mt-px ',
});

const dividerStyles = tv({
  base: 'font-bold opacity-30 text-sm leading-none ',
});

export interface ProjectPageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  projectId: string;
}

export function ProjectPageHeader({
  projectId,
  className,
  ...props
}: ProjectPageHeaderProps) {
  const { theme } = useTheme();
  const { useHeader } = useProject({ projectId });
  const { paths } = useHeader();

  return (
    <>
      <header className={headerStyles({ theme, className })} {...props}>
        {paths.map((path, i) => (
          <div key={path} className="flex items-center mt-0.5 gap-1">
            <span className={pathStyles()}>{path}</span>
            {i !== paths.length - 1 && (
              <span className={dividerStyles()}>{'>'}</span>
            )}
          </div>
        ))}
      </header>

      <span aria-hidden className="h-6 w-full" />
    </>
  );
}
