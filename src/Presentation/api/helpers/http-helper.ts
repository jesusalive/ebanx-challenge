import { NotFoundError, ServerError } from '@/Domain/shared/errors'
import { HttpResponse } from '@/Presentation/api/protocols/Http'

export const serverError = (error: Error, customMessage?: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack, customMessage)
})

export const ok = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const handlePresentationOfError = (err: Error): HttpResponse => {
  switch (err.constructor) {
    case NotFoundError: return notFound(err)
    default: return serverError(err)
  }
}
