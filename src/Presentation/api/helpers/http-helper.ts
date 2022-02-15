import { ServerError } from '@/Domain/shared/errors'
import { HttpResponse } from '@/Presentation/api/protocols/Http'

export const serverError = (error: Error, customMessage?: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack, customMessage)
})

export const ok = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: data
})
