import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  // Usando o generics do TS para termos intelissence
  private _id: UniqueEntityID // Private pq não quero que nenhum outro arquivo da aplicação possa alterar o id da entidade.
  protected props: Props // única propriedade que mantém uma referência de todos os campos da entidade

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  // Método usado para validar se uma entidade é igual à outra
  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
