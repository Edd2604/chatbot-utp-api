import { Global, Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { GeminiAIService } from './gemini-ai.service'
import { GeminiProvider } from './gemini-ai.provider'

@Global()
@Module({
  imports: [HttpModule],
  providers: [GeminiAIService, GeminiProvider],
  exports: [GeminiAIService],
})
export class GeminiAIModule {}
