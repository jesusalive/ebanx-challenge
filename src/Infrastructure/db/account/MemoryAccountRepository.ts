import { Account } from '@/Domain/account/Account'
import { databaseAccounts } from '@/Infrastructure/db/db-memory-mock'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { UpdateAccountByIdRepository, UpdateAccountData } from '@/Domain/account/repositories/UpdateAccountByIdRepository'

export class MemoryAccountRepository implements
  StoreAccountRepository,
  DropAllDataRepository,
  LoadAccountByIdRepository,
  UpdateAccountByIdRepository {
  async store (account: Account): Promise<void> {
    databaseAccounts.push(account)
  }

  async updateById (id: string, data: UpdateAccountData): Promise<void> {
    const account = databaseAccounts.find(dbAccount => dbAccount.getId() === id)
    account.setBalance(data.balance)
  }

  async loadById (id: string): Promise<Account> {
    const account = databaseAccounts.find(dbAccount => dbAccount.getId() === id)
    if (account === undefined) return null

    return account
  }

  async dropAllData (): Promise<void> {
    while (databaseAccounts.length) {
      databaseAccounts.pop()
    }
  }
}
