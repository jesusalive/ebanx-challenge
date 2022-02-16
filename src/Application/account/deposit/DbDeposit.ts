import { Account } from '@/Domain/account/Account'
import { NotFoundError } from '@/Domain/shared/errors'
import { Deposit } from '@/Domain/account/usecases/Deposit'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'

export class DbDeposit implements Deposit {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async do (amount: number, accountId: string): Promise<Account> {
    const account = await this.loadAccountByIdRepository.loadById(accountId)
    if (account === null) throw new NotFoundError('Account not found')

    account.makeDeposit(amount)
    return account
  }
}
