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
  const [attributeId, setAttributeId] = useState<string>('');
  const [timelineId, setTimelineId] = useState<string>('');

  const { project, usePerson, useFile, useTimeline } = useProject({
    projectId,
  });
  const { person, useAttribute } = usePerson({ personId });
  const { attribute } = useAttribute({ attributeId });
  const { file } = useFile({ fileId: attribute?.fileId });
  const { timeline } = useTimeline({ timelineId });

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
      hobbies: 'Hobbies',
      fears: 'Medos',
      motivations: 'Motivações',
      addictions: 'Vicios',
      desires: 'Desejos',
      habits: 'Habitos',
      edit: 'Editar',
      'build-blocks': 'Bloco de construção',
      attributes: 'Atributos',
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
      hobbies: file?.title ?? '',
      fears: file?.title ?? '',
      motivations: file?.title ?? '',
      addictions: file?.title ?? '',
      desires: file?.title ?? '',
      habits: file?.title ?? '',
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
        'hobbies',
        'fears',
        'motivations',
        'addictions',
        'desires',
        'habits',
      ];

      if (prevForFile.includes(previousRawPath)) {
        setAttributeId(rawPath);
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
