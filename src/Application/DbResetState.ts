import { ResetState } from '@/Domain/shared/usecases/ResetState'
import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'

export class DbResetState implements ResetState {
  constructor (
    private readonly dropAllDataRepository: DropAllDataRepository
  ) {}

  async reset (): Promise<void> {
    await this.dropAllDataRepository.dropAllData()
  }
}
