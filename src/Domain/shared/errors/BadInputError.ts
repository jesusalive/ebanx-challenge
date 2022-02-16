export class BadInputError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'BadInputError'
  }
}
