import { Module } from '@nestjs/common'
import { GeminiChatRunnerModule } from '@modules/orchestrators/gemini-chat-runner/gemini-chat-runner.module'
import { RunsModule } from '@modules/runs/runs.module'

import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
@Module({
  imports: [GeminiChatRunnerModule, RunsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
