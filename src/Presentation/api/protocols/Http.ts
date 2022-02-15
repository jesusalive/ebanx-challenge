import { OLT } from '@/Domain/OLT/OLT'

export interface HttpResponse {
  statusCode: number
  body?: any
}

export interface HttpRequest {
  body?: any
  params?: any
  olt?: OLT
  headers?: {
    'user-agent'?: string
    authorization?: string
  }
  query?: any
}
