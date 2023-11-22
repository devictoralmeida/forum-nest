import { UniqueEntityID } from '../entities/unique-entity-id'

// Eventos serão classes que irão implementar essa interface (ele falou estender)

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
