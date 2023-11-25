import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Person } from '@modules/Persons/models/Person';
import { PersonSnowflakeStructureBase } from '@modules/Persons/models/Person/valueObjects/PersonSnowflakeStructureBase';
import { PersonSnowflakeStructureExpansion } from '@modules/Persons/models/Person/valueObjects/PersonSnowflakeStructureExpansion';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  personId: string;
  projectId: string;
  userId: string;
  base: {
    function?: string | null;
    objective?: string | null;
    obstacle?: string | null;
    apprenticeship?: string | null;
    motivation?: string | null;
    povByThisEye?: string | null;
  };
  expansion: {
    function?: string | null;
    objective?: string | null;
    obstacle?: string | null;
    apprenticeship?: string | null;
    motivation?: string | null;
    povByThisEye?: string | null;
  };
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied | UnexpectedError,
    { person: Person }
  >
>;

@injectable()
export class UpdatePersonSnowflakeService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository
  ) {}

  async execute({
    base,
    expansion,
    personId,
    projectId,
    userId,
  }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ResourceNotFount());
    }

    if (project.structure !== 'snowflake') {
      return left(new UnexpectedError());
    }

    const person = await this.personsRepository.findById(personId);
    if (!person) {
      return left(new ResourceNotFount());
    }

    if (!project.features.featureIsApplied('person')) {
      return left(new UnexpectedError());
    }

    if (!person.userId.equals(user.id) || !project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    if (!person.snowflakeStructureBase) {
      person.snowflakeStructureBase = PersonSnowflakeStructureBase.create({});
    }

    if (!person.snowflakeStructureExpansion) {
      person.snowflakeStructureExpansion =
        PersonSnowflakeStructureExpansion.create({});
    }

    person.snowflakeStructureBase!.function = base.function;
    person.snowflakeStructureBase!.objective = base.objective;
    person.snowflakeStructureBase!.apprenticeship = base.apprenticeship;
    person.snowflakeStructureBase!.motivation = base.motivation;
    person.snowflakeStructureBase!.obstacle = base.obstacle;
    person.snowflakeStructureBase!.povByThisEye = base.povByThisEye;

    person.snowflakeStructureExpansion!.function = expansion.function;
    person.snowflakeStructureExpansion!.objective = expansion.objective;
    person.snowflakeStructureExpansion!.apprenticeship =
      expansion.apprenticeship;
    person.snowflakeStructureExpansion!.motivation = expansion.motivation;
    person.snowflakeStructureExpansion!.obstacle = expansion.obstacle;
    person.snowflakeStructureExpansion!.povByThisEye = expansion.povByThisEye;

    await this.personsRepository.save(person);

    return right({ person });
  }
}
