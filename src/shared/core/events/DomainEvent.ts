import { UniqueId } from '../valueObjects/UniqueId'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueId
}
