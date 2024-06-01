import { EventHandler } from '@shared/core/events/EventHandler';
import { injectable } from 'tsyringe';
import { DomainEvents } from '@shared/core/events/DomainEvents';
import { CreateTimelineService } from '../services/CreateTimeline.service';
import { ProjectCreatedWithTimelineEvent } from '@modules/projects/events/ProjectCreatedWithTimeline.event';

@injectable()
export class OnProjectWithTimelineCreated implements EventHandler {
  constructor(private readonly createTimelineService: CreateTimelineService) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.createTimelineForProject.bind(this),
      ProjectCreatedWithTimelineEvent.name
    );
  }

  async createTimelineForProject({ project }: ProjectCreatedWithTimelineEvent) {
    await this.createTimelineService.execute({ project, name: 'Padrão' });
  }
}
