import { DropAllDataRepository } from '@/Domain/shared/repositories/DropAllDataRepository'

export const makeDropAllDataRepositoryStub = (): DropAllDataRepository => {
  class DropAllDataRepositoryStub implements DropAllDataRepository {
    async dropAllData (): Promise<void> {}
  }

  return new DropAllDataRepositoryStub()
}
