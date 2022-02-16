import { nanoid } from 'nanoid'

export class Account {
  private balance: number
  private readonly id: string

  constructor (id?: string) {
    this.id = id || nanoid()
    this.balance = 0
  }

  makeDeposit (amount: number): void {
    this.balance += amount
  }

  makeWithdraw (amount: number): void {
    this.balance -= amount
  }

  getId (): string {
    return this.id
  }

  getBalance (): number {
    return this.balance
  }

  setBalance (amount: number): void {
    this.balance = amount
  }
}
