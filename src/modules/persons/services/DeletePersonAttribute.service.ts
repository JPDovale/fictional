import { UserNotFound } from '@modules/users/errors/UserNotFound.error';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { injectable } from 'tsyringe';
import { UsersRepository } from '@modules/users/repositories/Users.repository';
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error';
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error';
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { TransactorService } from '@infra/database/transactor/contracts/Transactor.service';
import { PersonsRepository } from '../repositories/Persons.repository';
import { PersonNotFound } from '../errors/PersonNotFound.error';
import { AttributesRepository } from '../repositories/Attributes.repository';
import { AttributeNotFound } from '../errors/AttributeNotFound.error';
import { AttributeMutation } from '../entities/AttributeMutation';
import { TimelineNotFound } from '@modules/timelines/errors/TimelineNotFound.error';
import { EventsRepository } from '@modules/timelines/repositories/Events.respository';
import { AttributeMutationNotFound } from '../errors/AttributeMutationNotFound.error';
import { AttributeMutationsRepository } from '../repositories/AttributeMutations.repository';

type Request = {
  attributeId: string;
  personId: string;
  projectId: string;
  userId: string;
};

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | PersonNotFound
  | AttributeNotFound
  | AttributeMutationNotFound
  | TimelineNotFound;

type Response = {
  null: null;
};

@injectable()
export class DeletePersonAttributeService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly transactor: TransactorService,
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly personsRepository: PersonsRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly attributeMutationsRepository: AttributeMutationsRepository
  ) {}

  async execute({
    userId,
    projectId,
    personId,
    attributeId,
  }: Request): Promise<Either<UserNotFound, Response>> {
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

    const person = await this.personsRepository.findById(personId);
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

    const events = await this.eventsRepository.findManyByAttributeId(
      attributeId
    );
    const mutationsToUpdate: AttributeMutation[] = [];

    const transaction = this.transactor.start();

    attribute.mutations.getItems().forEach((mut) => {
      mut.moveToTrash();
      mutationsToUpdate.push(mut);
    });

    events.forEach((event) => {
      event.moveToTrash();
    });

    attribute.moveToTrash();

    transaction.add((ctx) =>
      this.attributeMutationsRepository.saveMany(mutationsToUpdate, ctx)
    );
    transaction.add((ctx) => this.eventsRepository.saveMany(events, ctx));
    transaction.add((ctx) => this.attributesRepository.save(attribute, ctx));

    await this.transactor.execute(transaction);

    return right({ null: null });
  }
}
