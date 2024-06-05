import { EventHandler } from '@shared/core/events/EventHandler';
import { injectable } from 'tsyringe';
import { DomainEvents } from '@shared/core/events/DomainEvents';
import { CreateManyPersonEventsForDefaultTimelineService } from '../services/CreateManyPersonEventsForDefaultTimeline.service';
import { PersonCreatedWithTimelineEvent } from '@modules/persons/events/PersonCreatedWithTimelineEvent.event';

@injectable()
export class OnPersonWithTimelineEventsCreated implements EventHandler {
  constructor(
    private readonly createManyPersonEventsForDefaultTimelineService: CreateManyPersonEventsForDefaultTimelineService
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.createTimelineForProject.bind(this),
      PersonCreatedWithTimelineEvent.name
    );
  }

  async createTimelineForProject({
    person,
    eventsDate,
  }: PersonCreatedWithTimelineEvent) {
    await this.createManyPersonEventsForDefaultTimelineService.execute({
      eventsReceived: eventsDate,
      person,
    });
  }
}
