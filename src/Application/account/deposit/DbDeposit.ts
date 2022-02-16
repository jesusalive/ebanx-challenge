import { Account } from '@/Domain/account/Account'
import { Deposit } from '@/Domain/account/usecases/Deposit'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { UpdateAccountByIdRepository } from '@/Domain/account/repositories/UpdateAccountByIdRepository'

export class DbDeposit implements Deposit {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly storeAccountRepository: StoreAccountRepository,
    private readonly updateAccountByIdRepository: UpdateAccountByIdRepository
  ) {}

  async do (amount: number, accountId: string): Promise<Account> {
    let account = await this.loadAccountByIdRepository.loadById(accountId)
    if (account === null) {
      account = new Account(accountId || undefined)
      await this.storeAccountRepository.store(account)
    }

    const modifiedAccount = new Account(account.getId())
    modifiedAccount.setBalance(account.getBalance())

    modifiedAccount.makeDeposit(amount)
    await this.updateAccountByIdRepository.updateById(accountId, {
      balance: modifiedAccount.getBalance()
    })

    return modifiedAccount
  }
}
