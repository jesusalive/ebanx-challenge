import { DbDeposit } from '@/Application/account/deposit/DbDeposit'
import { MemoryMockAccountRepository } from '@/Infrastructure/db/account/MemoryMockAccountRepository'

export const makeDbDeposit = (): DbDeposit => {
  const memoryMockAccountRepository = new MemoryMockAccountRepository()
  return new DbDeposit(memoryMockAccountRepository, memoryMockAccountRepository, memoryMockAccountRepository)
}
