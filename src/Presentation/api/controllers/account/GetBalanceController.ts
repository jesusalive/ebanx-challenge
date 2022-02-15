import { GetBalance } from '@/Domain/account/usecases/GetBalance'
import { Controller } from '@/Presentation/api/protocols/Controller'
import { HttpRequest, HttpResponse } from '@/Presentation/api/protocols/Http'
import { handlePresentationOfError, ok } from '@/Presentation/api/helpers/http-helper'

export class GetBalanceController implements Controller {
  constructor (
    private readonly getBalance: GetBalance
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const balance = await this.getBalance.get(httpRequest.query.account_id)
      return ok(balance)
    } catch (err) {
      return handlePresentationOfError(err)
    }
  }
}
