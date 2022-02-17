export interface HttpResponse {
  contentType?: string
  statusCode: number
  body?: any
}

export interface HttpRequest {
  body?: any
  params?: any
  headers?: {
    'user-agent'?: string
    authorization?: string
  }
  query?: any
}
