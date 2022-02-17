import { DbWithdraw } from '@/Application/account/withdraw/DbWithdraw'
import { MemoryMockAccountRepository } from '@/Infrastructure/db/account/MemoryMockAccountRepository'

export const makeDbWithdraw = (): DbWithdraw => {
  const memoryMockAccountRepository = new MemoryMockAccountRepository()
  return new DbWithdraw(memoryMockAccountRepository, memoryMockAccountRepository)
}
