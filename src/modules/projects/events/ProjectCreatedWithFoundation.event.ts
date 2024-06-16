import { DomainEvent } from '@shared/core/events/DomainEvent'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { Project } from '../entities/Project'

export class ProjectCreatedWithFoundationEvent implements DomainEvent {
  public ocurredAt: Date
  private _project: Project

  constructor(project: Project) {
    this._project = project
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueId {
    return this._project.id
  }

  get project() {
    return this._project
  }
}
