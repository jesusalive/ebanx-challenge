import { Request } from 'express'
import { HttpRequest } from '@/Presentation/api/protocols/Http'

export const httpRequestFromExpressRequest = (req: Request): HttpRequest => ({
  body: req.body,
  headers: req.headers,
  params: req.params,
  query: req.query
})
