import { Account } from '@/Domain/account/Account'
import { StoreAccountRepository } from './StoreAccountRepository'
import { LoadAccountByIdRepository } from './LoadAccountByIdRepository'

export const makeStoreAccountRepositoryStub = (): StoreAccountRepository => {
  class StoreAccountRepositoryStub implements StoreAccountRepository {
    async store (): Promise<void> {}
  }

  return new StoreAccountRepositoryStub()
}

export const makeLoadAccountByIdRepositoryStub = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<Account> {
      const fakeAccount = new Account('1')
      fakeAccount.makeDeposit(15)

      return fakeAccount
    }
  }

  return new LoadAccountByIdRepositoryStub()
}
