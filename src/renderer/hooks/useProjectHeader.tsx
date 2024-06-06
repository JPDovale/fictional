import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';
import {
  ProjectPageHeader,
  ProjectPageHeaderProps,
} from '@rComponents/projects/ProjectPageHeader';
import { Optional } from '@shared/core/types/Optional';
import { useProject } from './useProject';

export function useProjectHeader() {
  const [projectId, setProjectId] = useState<string>('');
  const [personId, setPersonId] = useState<string>('');
  const [fileId, setFileId] = useState<string>('');
  const [timelineId, setTimelineId] = useState<string>('');

  const { project, usePersons, useFile, useTimeline } = useProject({
    projectId,
  });
  const { persons } = usePersons();
  const { file } = useFile({ fileId });
  const { timeline } = useTimeline({ timelineId });

  const person = persons?.find((p) => p.id === personId) ?? null;

  const { pathname } = useLocation();

  const { paths } = useMemo(() => {
    const _paths: string[] = [];

    const pathsMapper: { [x: string]: string } = {
      projects: 'Projeto',
      foundation: 'Fundação',
      persons: 'Personagens',
      'time-lines': 'Linhas de tempo',
      config: 'Configurações',
      'foundation-text': 'Fundamento',
      'what-happens': 'O quê acontece?',
      'where-happens': 'Onde acontece?',
      'why-happens': 'Por que acontece?',
      'who-happens': 'Com quem acontece?',
      new: 'Novo(a)',
      identity: 'Identidade',
      appearences: 'Aparências',
      dreams: 'Sonhos',
      objectives: 'Objetivos',
      personalities: 'Personalidades',
      traumas: 'Traumas',
      values: 'Valores',
      edit: 'Editar',
      'build-blocks': 'Bloco de construção',
    };

    const uuidsPathsMapper: { [x: string]: string } = {
      projects: project?.name ?? '',
      persons: person?.name ?? '',
      appearences: file?.title ?? '',
      dreams: file?.title ?? '',
      objectives: file?.title ?? '',
      personalities: file?.title ?? '',
      traumas: file?.title ?? '',
      values: file?.title ?? '',
      'time-lines': timeline?.name ?? '',
    };

    function makePath(rawPath: string, rawPaths: string[], index: number) {
      const path = pathsMapper[rawPath] ?? rawPath;

      const isUUIDSchema = z.string().uuid();
      const isUUID = isUUIDSchema.safeParse(rawPath).success;

      if (!isUUID) return path;

      const previousRawPath = rawPaths[index - 1];
      const pathMapped = uuidsPathsMapper[previousRawPath] ?? '';

      if (previousRawPath === 'projects') {
        setProjectId(rawPath);
      }

      if (previousRawPath === 'persons') {
        setPersonId(rawPath);
      }

      const prevForFile = [
        'appearences',
        'dreams',
        'objectives',
        'personalities',
        'traumas',
        'values',
      ];

      if (prevForFile.includes(previousRawPath)) {
        setFileId(rawPath);
      }

      if (previousRawPath === 'time-lines') {
        setTimelineId(rawPath);
      }

      return pathMapped;
    }

    const rawPaths = pathname.split('/').slice(1);
    const mappedPaths = rawPaths.map((rawPath, index) =>
      makePath(rawPath, rawPaths, index)
    );

    _paths.push(...mappedPaths);

    return { paths: _paths };
  }, [pathname, project?.name, person?.name]);

  return {
    paths,
    Header: ({ ...props }: Optional<ProjectPageHeaderProps, 'projectId'>) => (
      <ProjectPageHeader projectId={projectId} {...props} />
    ),
  };
}
