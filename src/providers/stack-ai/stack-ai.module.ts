import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { StackAIService } from './stack-ai.service'
import { StackAIController } from './stack-ai.controller'

@Module({
  imports: [HttpModule],
  providers: [StackAIService],
  controllers: [StackAIController],
  exports: [StackAIService],
})
export class StackAIModule {}
