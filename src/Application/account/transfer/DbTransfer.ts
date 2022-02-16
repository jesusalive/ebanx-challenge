import { NotFoundError } from '@/Domain/shared/errors'
import { Deposit } from '@/Domain/account/usecases/Deposit'
import { Withdraw } from '@/Domain/account/usecases/Withdraw'
import { Transfer, TransferResult } from '@/Domain/account/usecases/Transfer'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'

export class DbTransfer implements Transfer {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly deposit: Deposit,
    private readonly withdraw: Withdraw
  ) {}

  async do (amount: number, originAccountId: string, destinationAccountId: string): Promise<TransferResult> {
    const originAccount = await this.loadAccountByIdRepository.loadById(originAccountId)
    if (originAccount === null) throw new NotFoundError('Origin account not found')

    const updatedOriginAccount = await this.withdraw.do(amount, originAccountId)
    const updatedDestinationAccount = await this.deposit.do(amount, destinationAccountId)

    return {
      origin: updatedOriginAccount,
      destination: updatedDestinationAccount
    }
  }
}
