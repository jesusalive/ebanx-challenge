import { StoreAccountRepository } from './StoreAccountRepository'

export const makeStoreAccountRepositoryStub = (): StoreAccountRepository => {
  class StoreAccountRepositoryStub implements StoreAccountRepository {
    async store (): Promise<void> {}
  }

  return new StoreAccountRepositoryStub()
}
