import { fakerPT_BR } from '@faker-js/faker';
import { Project, ProjectProps } from '@modules/Projects/models/Project';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';

export function makeProject(
  override: Partial<ProjectProps> = {},
  id?: UniqueEntityId
): Project {
  const project = Project.create(
    {
      name: fakerPT_BR.company.name(),
      features: Features.createFromObject({
        'time-lines': true,
        'multi-book': true,
        city: true,
        family: true,
        inst: true,
        language: true,
        nation: true,
        person: true,
        planet: true,
        power: true,
        race: true,
        religion: true,
      }),
      userId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return project;
}
