import { Request, Response } from 'express'
import { HttpRequest } from '@/Presentation/api/protocols/Http'
import { Controller } from '@/Presentation/api/protocols/Controller'
import { httpRequestFromExpressRequest } from './express-adapters-helper'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = httpRequestFromExpressRequest(req)
    const httpResponse = await controller.handle(httpRequest)
    const expressResponse = res.status(httpResponse.statusCode)

    if (httpResponse.contentType && httpResponse.contentType !== 'application/json') {
      expressResponse.contentType(httpResponse.contentType)
      return expressResponse.send(httpResponse.body)
    }

    if (httpResponse.statusCode === 400 || httpResponse.statusCode === 500) {
      return expressResponse.json({
        error: httpResponse.body.message
      })
    }

    return expressResponse.json(httpResponse.body)
  }
}
