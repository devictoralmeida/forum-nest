import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  public value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  // Método usado para validar se uma entidade é igual à outra
  equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
