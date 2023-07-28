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
        'time-lines': fakerPT_BR.datatype.boolean(),
        book: fakerPT_BR.datatype.boolean(),
        city: fakerPT_BR.datatype.boolean(),
        family: fakerPT_BR.datatype.boolean(),
        inst: fakerPT_BR.datatype.boolean(),
        language: fakerPT_BR.datatype.boolean(),
        nation: fakerPT_BR.datatype.boolean(),
        person: fakerPT_BR.datatype.boolean(),
        planet: fakerPT_BR.datatype.boolean(),
        power: fakerPT_BR.datatype.boolean(),
        race: fakerPT_BR.datatype.boolean(),
        religion: fakerPT_BR.datatype.boolean(),
      }),
      userId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return project;
}
