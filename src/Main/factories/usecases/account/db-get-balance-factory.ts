import { DbGetBalance } from '@/Application/account/DbGetBalance'
import { MemoryAccountRepository } from '@/Infrastructure/db/account/MemoryAccountRepository'

export const makeDbGetBalance = (): DbGetBalance => {
  const memoryAccountRepository = new MemoryAccountRepository()
  return new DbGetBalance(memoryAccountRepository)
}
