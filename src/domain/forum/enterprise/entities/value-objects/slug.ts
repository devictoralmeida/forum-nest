export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  static createFromText(text: string) {
    // Recebendo uma string e transformando em um slug válido

    const slugText = text
      .normalize('NFKD') // Esse método remove as acentuações dos caracteres.
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/, '')

    return new Slug(slugText)
  }
}
