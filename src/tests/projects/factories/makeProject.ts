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
        'time-lines': false,
        'multi-book': false,
        city: false,
        family: false,
        inst: false,
        language: false,
        nation: false,
        person: false,
        planet: false,
        power: false,
        race: false,
        religion: false,
      }),
      userId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return project;
}
