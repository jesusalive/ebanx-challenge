import { Request, Response } from 'express'
import { HttpRequest } from '@/Presentation/api/protocols/Http'
import { Controller } from '@/Presentation/api/protocols/Controller'
import { httpRequestFromExpressRequest } from './express-adapters-helper'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = httpRequestFromExpressRequest(req)
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 400) {
      return res.status(400).json({
        error: httpResponse.body.message
      })
    }

    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
