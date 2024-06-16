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
import { File } from '@modules/files/entites/File';
import { FilesRepository } from '@modules/files/repositories/Files.repository';
import { PersonsRepository } from '../repositories/Persons.repository';
import { PersonNotFound } from '../errors/PersonNotFound.error';
import { AttributesRepository } from '../repositories/Attributes.repository';
import { AttributeNotFound } from '../errors/AttributeNotFound.error';
import { AttributeMutation } from '../entities/AttributeMutation';
import { TimelinesRepository } from '@modules/timelines/repositories/Timelines.repository';
import { TimelineNotFound } from '@modules/timelines/errors/TimelineNotFound.error';
import { Event, ImportanceLevel } from '@modules/timelines/entities/Event';
import { EventDate } from '@modules/timelines/valueObjects/EventDate';
import { EventsRepository } from '@modules/timelines/repositories/Events.respository';

type Request = {
  attributeId: string;
  personId: string;
  projectId: string;
  userId: string;
  date?: string;
  importanceLevel?: number;
  title?: string;
};

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | PersonNotFound
  | AttributeNotFound
  | TimelineNotFound;

type Response = {
  null: null;
};

@injectable()
export class CreatePersonAttributeMutationService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly transactor: TransactorService,
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly personsRepository: PersonsRepository,
    private readonly filesRepository: FilesRepository,
    private readonly attributesRepository: AttributesRepository,
    private readonly timelinesRepository: TimelinesRepository,
    private readonly eventsRepository: EventsRepository
  ) {}

  async execute({
    userId,
    projectId,
    personId,
    attributeId,
    date,
    title,
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

    const attributeFile = await this.filesRepository.findById(
      attribute.fileId.toString()
    );
    if (!attributeFile) {
      return left(new AttributeNotFound());
    }

    const file = File.create({
      projectId: project.id,
    });

    const position = attribute.mutations.getItems().length + 1;

    const attributeMutation = AttributeMutation.create({
      attributeId: attribute.id,
      fileId: file.id,
      position,
      title,
    });
    const transaction = this.transactor.start();

    if (project.buildBlocks.implements(BuildBlock.TIME_LINES) && date) {
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

      transaction.add((ctx) => this.eventsRepository.create(event, ctx));

      attributeMutation.eventId = event.id;
    }

    attribute.mutations.add(attributeMutation);

    transaction.add((ctx) => this.filesRepository.create(file, ctx));
    transaction.add((ctx) => this.attributesRepository.save(attribute, ctx));

    await this.transactor.execute(transaction);

    return right({ null: null });
  }
}
