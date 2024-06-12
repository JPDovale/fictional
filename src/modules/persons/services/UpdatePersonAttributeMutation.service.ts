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
import { TimelineNotFound } from '@modules/timelines/errors/TimelineNotFound.error';
import { AttributeMutationNotFound } from '../errors/AttributeMutationNotFound.error';
import { AttributeMutationsRepository } from '../repositories/AttributeMutations.repository';
import { Attribute } from '../entities/Attribute';
import { Event, ImportanceLevel } from '@modules/timelines/entities/Event';
import { EventsRepository } from '@modules/timelines/repositories/Events.respository';
import { EventDate } from '@modules/timelines/valueObjects/EventDate';
import { EventNotFound } from '@modules/timelines/errors/EventNotFound.error';
import { TimelinesRepository } from '@modules/timelines/repositories/Timelines.repository';
import { Logger } from '@utils/logger';

type Request = {
  attributeId: string;
  personId: string;
  projectId: string;
  userId: string;
  mutationId: string;
  title?: string | null;
  date?: string | null;
  importanceLevel?: number;
};

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | PersonNotFound
  | AttributeNotFound
  | AttributeMutationNotFound
  | TimelineNotFound
  | EventNotFound;

type Response = {
  attribute: Attribute;
};

@injectable()
export class UpdatePersonAttributeMutationService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly transactor: TransactorService,
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly personsRepository: PersonsRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly attributeMutationsRepository: AttributeMutationsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly timelinesRepository: TimelinesRepository
  ) {}

  async execute({
    userId,
    projectId,
    personId,
    attributeId,
    mutationId,
    title,
    date,
    importanceLevel,
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

    const mutation = attribute.mutations
      .getItems()
      .find((mut) => mut.id.toString() === mutationId);
    if (!mutation) {
      return left(new AttributeMutationNotFound());
    }

    const transaction = this.transactor.start();

    mutation.title = title;

    if (
      (date || importanceLevel) &&
      !project.buildBlocks.implements(BuildBlock.TIME_LINES)
    ) {
      return left(new ProjectAcctionBlocked());
    }

    if (mutation.eventId) {
      const event = await this.eventsRepository.findById(
        mutation.eventId.toString()
      );

      if (!event) {
        return left(new EventNotFound());
      }

      event.date = date;
      event.importanceLevel = importanceLevel as ImportanceLevel;

      if (event.trashedAt) {
        mutation.eventId = null;
      }

      transaction.add((ctx) => this.eventsRepository.save(event, ctx));
    }

    if (date && !mutation.eventId) {
      const timeline = await this.timelinesRepository.findByProjectId(
        project.id.toString()
      );
      if (!timeline) {
        return left(new TimelineNotFound());
      }

      const event = Event.create({
        timelineId: timeline.id,
        event: `Mudança em $=${attribute.id.toString()}=attr$= de $=${person.id.toString()}=pers$=`,
        date: EventDate.createFromString(date),
        importanceLevel: importanceLevel as ImportanceLevel,
      });

      mutation.eventId = event.id;
      transaction.add((ctx) => this.eventsRepository.create(event, ctx));
    }

    transaction.add((ctx) =>
      this.attributeMutationsRepository.save(mutation, ctx)
    );

    await this.transactor.execute(transaction);

    return right({ attribute });
  }
}
