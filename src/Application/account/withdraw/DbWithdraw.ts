import { Account } from '@/Domain/account/Account'
import { NotFoundError } from '@/Domain/shared/errors'
import { Withdraw } from '@/Domain/account/usecases/Withdraw'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { UpdateAccountByIdRepository } from '@/Domain/account/repositories/UpdateAccountByIdRepository'

export class DbWithdraw implements Withdraw {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly updateAccountByIdRepository: UpdateAccountByIdRepository
  ) {}

  async do (amount: number, accountId: string): Promise<Account> {
    const account = await this.loadAccountByIdRepository.loadById(accountId)
    if (account === null) throw new NotFoundError('Account not found')

    account.makeWithdraw(amount)
    await this.updateAccountByIdRepository.updateById(accountId, {
      balance: account.getBalance()
    })

    return account
  }
}
