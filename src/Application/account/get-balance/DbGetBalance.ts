import { GetBalance } from '@/Domain/account/usecases/GetBalance'
import { LoadAccountByIdRepository } from '@/Domain/account/repositories/LoadAccountByIdRepository'
import { NotFoundError } from '@/Domain/shared/errors'

export class DbGetBalance implements GetBalance {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async get (accountId: string): Promise<number> {
    const account = await this.loadAccountByIdRepository.loadById(accountId)
    if (account === null) throw new NotFoundError('Account not found')

    return account.getBalance()
  }
}
