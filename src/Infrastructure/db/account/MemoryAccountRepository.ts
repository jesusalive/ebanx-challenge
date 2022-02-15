import { Account } from '@/Domain/account/Account'
import { databaseAccounts } from '@/Infrastructure/db/db-memory-mock'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'

export class MemoryAccountRepository implements StoreAccountRepository, DropAllDataRepository, LoadAccountByIdRepository {
  async store (account: Account): Promise<void> {
    databaseAccounts.push(account)
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
