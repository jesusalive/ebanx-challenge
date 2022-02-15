import { Account } from '@/Domain/account/Account'
import { ResetState } from '@/Domain/shared/usecases/ResetState'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'
import { StoreAccountRepository } from '@/Domain/account/repositories/StoreAccountRepository'

export class DbResetState implements ResetState {
  constructor (
    private readonly dropAllDataRepository: DropAllDataRepository,
    private readonly storeAccountRepository: StoreAccountRepository
  ) {}

  async reset (): Promise<void> {
    await this.dropAllDataRepository.dropAllData()

    const defaultAccount = new Account('100')
    await this.storeAccountRepository.store(defaultAccount)
  }
}
