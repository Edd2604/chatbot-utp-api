import { GoogleGenerativeAI } from '@google/generative-ai'
import { envs } from 'src/config/envs'

export const GeminiProvider = {
  provide: GoogleGenerativeAI,
  useFactory: () => {
    const apiKey = envs.geminiApiKey
    return new GoogleGenerativeAI(apiKey)
  },
}
