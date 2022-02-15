import { DbResetState } from '@/Application/DbResetState'
import { MemoryAccountRepository } from '@/Infrastructure/db/account/MemoryAccountRepository'

export const makeDbResetState = (): DbResetState => {
  const memoryAccountRepository = new MemoryAccountRepository()
  return new DbResetState(memoryAccountRepository, memoryAccountRepository)
}
