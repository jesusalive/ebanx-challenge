import { nanoid } from 'nanoid'

export class Account {
  private readonly id: string
  private readonly balance: number

  constructor (id?: string) {
    this.id = id || nanoid()
    this.balance = 0
  }

  getId (): string {
    return this.id
  }

  getBalance (): number {
    return this.balance
  }
}
