import { DbResetState } from '@/Application/DbResetState'
import { MemoryMockAccountRepository } from '@/Infrastructure/db/account/MemoryMockAccountRepository'

export const makeDbResetState = (): DbResetState => {
  const memoryMockAccountRepository = new MemoryMockAccountRepository()
  return new DbResetState(memoryMockAccountRepository)
}
