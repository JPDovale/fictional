import { fakerPT_BR } from '@faker-js/faker';
import {
  Project,
  ProjectProps,
  ProjectStructureType,
  ProjectType,
} from '@modules/projects/entities/Project';
import { BuildBlocks } from '@modules/projects/valueObjects/BuildBlocks';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { randomUUID } from 'crypto';

export function makeProject(
  override: Partial<ProjectProps> = {},
  id?: UniqueId
): Project {
  const project = Project.create(
    {
      name: fakerPT_BR.person.fullName(),
      userId: UniqueId.create(randomUUID()),
      type: ProjectType.BOOK,
      structureType: ProjectStructureType.FICTIONAL_FLOW,
      buildBlocks: BuildBlocks.create([]),
      ...override,
    },
    id
  );

  return project;
}
