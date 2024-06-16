import { UserNotFound } from '@modules/users/errors/UserNotFound.error';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { injectable } from 'tsyringe';
import { UsersRepository } from '@modules/users/repositories/Users.repository';
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error';
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error';
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { PersonsRepository } from '../repositories/Persons.repository';
import { PersonNotFound } from '../errors/PersonNotFound.error';
import { PersonWithDetails } from '../valuesObjects/PersonWithDetails';
import { AttributesRepository } from '../repositories/Attributes.repository';
import { AttributeNotFound } from '../errors/AttributeNotFound.error';
import { Attribute } from '../entities/Attribute';

type Request = {
  projectId: string;
  userId: string;
  personId: string;
  attributeId: string;
};

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | PersonNotFound
  | AttributeNotFound;

type Response = {
  attribute: Attribute;
};

@injectable()
export class GetPersonAttributeService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly personsRepository: PersonsRepository,
    private readonly attributesRepository: AttributesRepository
  ) {}

  async execute({
    userId,
    projectId,
    personId,
    attributeId,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFound());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ProjectNotFound());
    }

    if (!project.userId.equals(user.id)) {
      return left(new ProjectAcctionBlocked());
    }

    if (!project.buildBlocks.implements(BuildBlock.PERSONS)) {
      return left(new ProjectAcctionBlocked());
    }

    const person = await this.personsRepository.findWithDetailsById(personId);
    if (!person) {
      return left(new PersonNotFound());
    }

    if (!person.projectId.equals(project.id)) {
      return left(new ProjectAcctionBlocked());
    }

    const attribute = await this.attributesRepository.findById(attributeId);
    if (!attribute) {
      return left(new AttributeNotFound());
    }

    return right({ attribute });
  }
}
