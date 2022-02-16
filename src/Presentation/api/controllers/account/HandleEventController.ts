import { NotFoundError } from '@/Domain/shared/errors'
import { Deposit } from '@/Domain/account/usecases/Deposit'
import { Transfer } from '@/Domain/account/usecases/Transfer'
import { Withdraw } from '@/Domain/account/usecases/Withdraw'
import { Validation } from '@/Domain/shared/protocols/Validation'
import { Controller } from '@/Presentation/api/protocols/Controller'
import { HttpRequest, HttpResponse } from '@/Presentation/api/protocols/Http'
import { badRequest, created, notFound, serverError } from '@/Presentation/api/helpers/http-helper'

export class HandleEventController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deposit: Deposit,
    private readonly withdraw: Withdraw,
    private readonly transfer: Transfer
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const err = this.validation.validate(httpRequest.body)
      if (err) return badRequest(err)

      const { destination, origin, amount, type } = httpRequest.body

      if (type === 'deposit') {
        const updatedAccount = await this.deposit.do(amount, destination)
        return created({
          destination: updatedAccount
        })
      }

      if (type === 'withdraw') {
        const updatedAccount = await this.withdraw.do(amount, origin)
        return created({
          origin: updatedAccount
        })
      }

      if (type === 'transfer') {
        const transferResult = await this.transfer.do(amount, origin, destination)
        return created(transferResult)
      }
    } catch (err) {
      if (err instanceof NotFoundError) return notFound(0)
      return serverError(err)
    }
  }
}
