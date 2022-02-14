export type EventType = 'deposit' | 'withdraw' | 'transfer'

export class Event {
  constructor (
    private readonly amount: number,
    private readonly type: EventType,
    private readonly destination: string
  ) {}

  getAmount (): number {
    return this.amount
  }

  getType (): EventType {
    return this.type
  }

  getDestination (): string {
    return this.destination
  }
}
