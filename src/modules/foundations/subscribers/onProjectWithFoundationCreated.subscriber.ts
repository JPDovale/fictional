import { EventHandler } from '@shared/core/events/EventHandler'
import { injectable } from 'tsyringe'
import { DomainEvents } from '@shared/core/events/DomainEvents'
import { ProjectCreatedWithFoundationEvent } from '@modules/projects/events/ProjectCreatedWithFoundation.event'
import { CreateFoundationService } from '../services/CreateFoundation.serice'

@injectable()
export class OnProjectWithFoundationCreated implements EventHandler {
  constructor(
    private readonly createFoundationService: CreateFoundationService,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.createFoundationForProject.bind(this),
      ProjectCreatedWithFoundationEvent.name,
    )
  }

  async createFoundationForProject({
    project,
  }: ProjectCreatedWithFoundationEvent) {
    await this.createFoundationService.execute({ project })
  }
}
