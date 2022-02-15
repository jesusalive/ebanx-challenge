import { Account } from '@/Domain/account/Account'
import { databaseAccounts } from '@/Infrastructure/db/db-memory-mock'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'

export class MemoryAccountRepository implements StoreAccountRepository, DropAllDataRepository {
  async store (account: Account): Promise<void> {
    databaseAccounts.push(account)
  }

  async dropAllData (): Promise<void> {
    while (databaseAccounts.length) {
      databaseAccounts.pop()
    }
  }
}
