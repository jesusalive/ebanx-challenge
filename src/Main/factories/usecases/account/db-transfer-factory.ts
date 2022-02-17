import { makeDbDeposit } from './db-deposit-factory'
import { makeDbWithdraw } from './db-withdraw-factory'
import { DbTransfer } from '@/Application/account/transfer/DbTransfer'
import { MemoryMockAccountRepository } from '@/Infrastructure/db/account/MemoryMockAccountRepository'

export const makeDbTransfer = (): DbTransfer => {
  const dbDeposit = makeDbDeposit()
  const dbWithdraw = makeDbWithdraw()
  const memoryMockAccountRepository = new MemoryMockAccountRepository()

  return new DbTransfer(memoryMockAccountRepository, dbDeposit, dbWithdraw)
}
