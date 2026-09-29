import { IGeminiRunData } from './gemini-ai-entity.interface'

export interface IGeminiRunError {
  error: {
    ok: false
    message: string
    statusCode: number
  }
  metadata: IGeminiRunData
}
