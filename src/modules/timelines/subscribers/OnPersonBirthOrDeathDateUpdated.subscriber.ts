import { EventHandler } from '@shared/core/events/EventHandler';
import { injectable } from 'tsyringe';
import { DomainEvents } from '@shared/core/events/DomainEvents';
import { PersonBirthOrDeathDateUpdatedEvent } from '@modules/persons/events/PersonBirthOrDeathDateUpdated.event';
import { UpdateBirthAndDeathDateOfPersonInDeafultTimelineService } from '../services/UpdateBirthAndDeathDateOfPersonInDefaultTimeline.service';
import { Logger } from '@utils/logger';

@injectable()
export class OnPersonBirthOrDeathDateUpdated implements EventHandler {
  constructor(
    private readonly updateBirthAndDeathDateOfPersonInDeafultTimelineService: UpdateBirthAndDeathDateOfPersonInDeafultTimelineService
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.updateAllEventsOfPerson.bind(this),
      PersonBirthOrDeathDateUpdatedEvent.name
    );
  }

  async updateAllEventsOfPerson({
    person,
    birthDate,
    deathDate,
  }: PersonBirthOrDeathDateUpdatedEvent) {
    const response =
      await this.updateBirthAndDeathDateOfPersonInDeafultTimelineService.execute(
        {
          person,
          birthDate,
          deathDate,
        }
      );
  }
}
