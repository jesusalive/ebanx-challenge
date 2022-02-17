import { ResetState } from '@/Domain/shared/usecases/ResetState'
import { Controller } from '@/Presentation/api/protocols/Controller'
import { plainText, serverError } from '@/Presentation/api/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@/Presentation/api/protocols/Http'

export class ResetStateController implements Controller {
  constructor (
    private readonly resetState: ResetState
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.resetState.reset()
      return plainText('OK')
    } catch (err) {
      return serverError(err)
    }
  }
}
