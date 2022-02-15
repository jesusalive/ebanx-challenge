import { nanoid } from 'nanoid'
import { ForbiddenError } from '@/Domain/shared/errors'

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
    if (amount > this.balance) throw new ForbiddenError('Account does not have enough balance to withdraw')
    this.balance -= amount
  }

  getId (): string {
    return this.id
  }

  getBalance (): number {
    return this.balance
  }
}
