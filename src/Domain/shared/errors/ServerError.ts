export class ServerError extends Error {
  constructor (stack?: string, customMessage?: string) {
    super(customMessage || 'Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
