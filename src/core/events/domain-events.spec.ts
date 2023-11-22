/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-use-before-define */
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

// Aqui pode ser um AnswerCreated (por ex), essa classe é um evento.
class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

// Entidade genérica da aplicação
class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    // Registrando que o evento aconteceu.
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber cadastrado (ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma resposta, porém SEM salvar no banco.
    const aggregate = CustomAggregate.create()

    // Estou esperando que o evento foi criado, porém NÃO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Quando o evento estiver pronto, o DB irá dispara-lo passando o id do agregado.
    // Estou salvando a resposta no banco de dados e assim DISPARANDO o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Espero que essa função fake criada tenha sido disparada.
    // O subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()

    // Espero que não tenha mais nenhum evento na fila.
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
