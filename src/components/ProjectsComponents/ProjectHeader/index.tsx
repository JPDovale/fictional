import { useTheme } from '@hooks/useTheme';
import { useNav } from '@hooks/useNav';
import { ProjectModelResponse } from '@modules/Projects/dtos/models/types';
import { divider, pathOnHeaderStyles, projectHeaderStyles } from './styles';

interface ProjectHeaderProps {
  project?: ProjectModelResponse | null;
}

const possiblesPaths = {
  projects: 'Projetos',
  ':id': () => 'name',
  structure: 'Estrutura',
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { theme } = useTheme();
  const { pathname, makeBaseUrl } = useNav();

  function makePathsOnHeader() {
    const paths = makeBaseUrl(pathname)
      .split('/')
      .filter((slice) => slice !== '');

    const pathsOnHeader = paths.map(
      (path) => possiblesPaths[path as keyof typeof possiblesPaths]
    );

    return pathsOnHeader;
  }

  const pathsOnHeader = makePathsOnHeader();

  return (
    <header className={projectHeaderStyles({ theme })}>
      {pathsOnHeader.map((path) => {
        if (!path) return null;
        if (typeof path === 'string') {
          return (
            <div className="flex items-center gap-0.5" key={path}>
              <span className={pathOnHeaderStyles()}>{path}</span>
              <span className={divider()}>/</span>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-0.5" key={path()}>
            <span className={pathOnHeaderStyles()}>
              {project &&
                (project[path() as keyof ProjectModelResponse] as string)}
            </span>
            <span className={divider()}>/</span>
          </div>
        );
      })}
    </header>
  );
}
