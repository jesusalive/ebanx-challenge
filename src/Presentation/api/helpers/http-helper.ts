import { ServerError } from '@/Domain/shared/errors'
import { HttpResponse } from '@/Presentation/api/protocols/Http'

export const serverError = (error: Error, customMessage?: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack, customMessage)
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const created = (data?: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const plainText = (text: string): HttpResponse => ({
  statusCode: 200,
  contentType: 'plain/text',
  body: text
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: data
})
