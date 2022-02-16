import { DbGetBalance } from '@/Application/account/get-balance/DbGetBalance'
import { MemoryMockAccountRepository } from '@/Infrastructure/db/account/MemoryMockAccountRepository'

export const makeDbGetBalance = (): DbGetBalance => {
  const memoryMockAccountRepository = new MemoryMockAccountRepository()
  return new DbGetBalance(memoryMockAccountRepository)
}
