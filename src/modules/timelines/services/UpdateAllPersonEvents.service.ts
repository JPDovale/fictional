import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { injectable } from 'tsyringe';
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository';
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error';
import { TimelineNotFound } from '../errors/TimelineNotFound.error';
import { Event } from '../entities/Event';
import { EventsRepository } from '../repositories/Events.respository';
import { EventToPersonType } from '../entities/EventToPerson';
import { Person } from '@modules/persons/entities/Person';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error';
import { EventsToPersonRepository } from '../repositories/EventsToPerson.repository';

type Request = {
  person: Person;
};

type PossibleErros = ProjectNotFound | TimelineNotFound | ProjectAcctionBlocked;

type Response = {
  events: Event[];
};

@injectable()
export class UpdateAllPersonEventsService
  implements Service<Request, PossibleErros, Response>
{
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly eventsToPersonRepository: EventsToPersonRepository
  ) {}

  async execute({ person }: Request): Promise<Either<PossibleErros, Response>> {
    const project = await this.projectsRepository.findById(
      person.projectId.toString()
    );
    if (!project) {
      return left(new ProjectNotFound());
    }

    if (!project.buildBlocks.implements(BuildBlock.TIME_LINES)) {
      return left(new ProjectAcctionBlocked());
    }

    const eventsToPerson =
      await this.eventsToPersonRepository.findManyByPersonId(
        person.id.toString()
      );
    const eventsIds = eventsToPerson.map((event) => event.eventId.toString());
    const events = await this.eventsRepository.findManyByIds(eventsIds);

    for (const eventToPerson of eventsToPerson) {
      const eventType = eventToPerson.type;
      const eventIndex = events.findIndex((event) =>
        event.id.equals(eventToPerson.eventId)
      );

      if (eventIndex < 0) {
        return left(new ProjectAcctionBlocked());
      }

      events[eventIndex].event = `${
        eventType === EventToPersonType.BIRTH ? 'Nascimento' : 'Morte'
      } de ${person.name ?? '??????'}`;
    }

    await this.eventsRepository.saveMany(events);

    return right({ events });
  }
}
