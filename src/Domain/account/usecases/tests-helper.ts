import { Deposit } from './Deposit'
import { Withdraw } from './Withdraw'
import { Account } from '@/Domain/account/Account'

export const makeDepositStub = (): Deposit => {
  class DepositStub implements Deposit {
    async do (): Promise<Account> {
      return new Account('123')
    }
  }

  return new DepositStub()
}

export const makeWithdrawStub = (): Withdraw => {
  class WithdrawStub implements Withdraw {
    async do (): Promise<Account> {
      return new Account('456')
    }
  }

  return new WithdrawStub()
}
