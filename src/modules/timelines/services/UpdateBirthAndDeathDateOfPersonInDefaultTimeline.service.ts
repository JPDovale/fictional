import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { injectable } from 'tsyringe';
import { TimelinesRepository } from '../repositories/Timelines.repository';
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository';
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error';
import { TimelineNotFound } from '../errors/TimelineNotFound.error';
import { Event } from '../entities/Event';
import { EventDate } from '../valueObjects/EventDate';
import { EventsRepository } from '../repositories/Events.respository';
import { EventToPerson, EventToPersonType } from '../entities/EventToPerson';
import { Person } from '@modules/persons/entities/Person';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error';
import { EventsToPersonRepository } from '../repositories/EventsToPerson.repository';
import { TransactorService } from '@infra/database/transactor/contracts/Transactor.service';

type Request = {
  person: Person;
  birthDate?: string | null;
  deathDate?: string | null;
};

type PossibleErros = ProjectNotFound | TimelineNotFound | ProjectAcctionBlocked;

type Response = {
  events: Event[];
  eventsToPerson: EventToPerson[];
};

@injectable()
export class UpdateBirthAndDeathDateOfPersonInDeafultTimelineService
  implements Service<Request, PossibleErros, Response>
{
  constructor(
    private readonly transactor: TransactorService,
    private readonly timelinesRepository: TimelinesRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly eventsToPersonRepository: EventsToPersonRepository
  ) {}

  async execute({
    birthDate,
    deathDate,
    person,
  }: Request): Promise<Either<PossibleErros, Response>> {
    const project = await this.projectsRepository.findById(
      person.projectId.toString()
    );
    if (!project) {
      return left(new ProjectNotFound());
    }

    if (!project.buildBlocks.implements(BuildBlock.TIME_LINES)) {
      return left(new ProjectAcctionBlocked());
    }

    const timeline = await this.timelinesRepository.findByProjectId(
      project.id.toString()
    );
    if (!timeline) {
      return left(new TimelineNotFound());
    }

    let eventsToPerson =
      await this.eventsToPersonRepository.findBirthAndDeathByPersonIdAndTimelineId(
        {
          personId: person.id.toString(),
          timelineId: timeline.id.toString(),
        }
      );
    const eventsIds = eventsToPerson.map((event) => event.eventId.toString());
    let events = await this.eventsRepository.findManyByIds(eventsIds);

    const eventToPersonBirth = eventsToPerson.find(
      (event) => event.type === EventToPersonType.BIRTH
    );
    const eventToPersonDeath = eventsToPerson.find(
      (event) => event.type === EventToPersonType.DEATH
    );

    const birthEventIndex = events.findIndex((event) =>
      event.id.equals(eventToPersonBirth?.eventId)
    );
    const deathEventIndex = events.findIndex((event) =>
      event.id.equals(eventToPersonDeath?.eventId)
    );
    const birthEvent = events[birthEventIndex];
    const deathEvent = events[deathEventIndex];

    const transaction = this.transactor.start();

    function makeEvents(date: string, type: EventToPersonType) {
      const firstWordOfEvent =
        type === EventToPersonType.BIRTH ? 'Nascimento' : 'Morte';

      const event = Event.create({
        timelineId: timeline!.id,
        event: `${firstWordOfEvent} de $=${person.id.toString()}=pers$=`,
        date: EventDate.createFromString(date),
        importanceLevel: Event.getImportanceLevelForPersonEvent(
          person.type,
          type
        ),
      });

      const eventToPerson = EventToPerson.create({
        eventId: event.id,
        personId: person.id,
        type,
      });

      events.push(event);
      eventsToPerson.push(eventToPerson);

      return { event, eventToPerson };
    }

    if (!eventToPersonBirth && birthDate) {
      const { event, eventToPerson } = makeEvents(
        birthDate,
        EventToPersonType.BIRTH
      );

      transaction.add((ctx) => this.eventsRepository.create(event, ctx));
      transaction.add((ctx) =>
        this.eventsToPersonRepository.create(eventToPerson, ctx)
      );
    }

    if (!eventToPersonDeath && deathDate) {
      const { event, eventToPerson } = makeEvents(
        deathDate,
        EventToPersonType.DEATH
      );

      transaction.add((ctx) => this.eventsRepository.create(event, ctx));
      transaction.add((ctx) =>
        this.eventsToPersonRepository.create(eventToPerson, ctx)
      );
    }

    if (birthEvent && birthDate && birthEvent.date.toString() !== birthDate) {
      birthEvent.date = EventDate.createFromString(birthDate);
      events[birthEventIndex] = birthEvent;
      transaction.add((ctx) => this.eventsRepository.save(birthEvent, ctx));
    }

    if (deathEvent && deathDate && deathEvent.date.toString() !== deathDate) {
      deathEvent.date = EventDate.createFromString(deathDate);
      events[deathEventIndex] = deathEvent;
      transaction.add((ctx) => this.eventsRepository.save(deathEvent, ctx));
    }

    if (birthDate === null && birthEvent && eventToPersonBirth) {
      eventToPersonBirth.moveToTrash();
      birthEvent.moveToTrash();
      transaction.add((ctx) =>
        this.eventsToPersonRepository.save(eventToPersonBirth, ctx)
      );
      transaction.add((ctx) => this.eventsRepository.save(birthEvent, ctx));

      eventsToPerson = eventsToPerson.filter(
        (event) => !event.id.equals(eventToPersonBirth.id)
      );
      events = events.filter((event) => !event.id.equals(birthEvent.id));
    }

    if (deathDate === null && deathEvent && eventToPersonDeath) {
      eventToPersonDeath.moveToTrash();
      deathEvent.moveToTrash();
      transaction.add((ctx) =>
        this.eventsToPersonRepository.save(eventToPersonDeath, ctx)
      );
      transaction.add((ctx) => this.eventsRepository.save(deathEvent, ctx));

      eventsToPerson = eventsToPerson.filter(
        (event) => !event.id.equals(eventToPersonDeath.id)
      );
      events = events.filter((event) => !event.id.equals(deathEvent.id));
    }

    await this.transactor.execute(transaction);

    return right({ events, eventsToPerson });
  }
}
