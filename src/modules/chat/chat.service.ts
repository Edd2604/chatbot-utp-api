import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GeminiChatRunnerService } from '@modules/orchestrators/gemini-chat-runner/gemini-chat-runner.service'
import { RunsService } from '@modules/runs/runs.service'

import { Message } from './interfaces/chat.interfaces'
import { RequestChatDto } from './dto/request-chat.dto'

@Injectable()
export class ChatService {
  constructor(
    private readonly geminiRunner: GeminiChatRunnerService,
    private readonly runsService: RunsService,
  ) {}

  doStream(requestChat: RequestChatDto): Observable<unknown> {
    const { conversation_id, topic_id, message } = requestChat
    return this.geminiRunner.streamChatResponse(
      conversation_id,
      message,
      topic_id,
    )
  }

  async getChathistory(converationId: string): Promise<Message[]> {
    const runs = await this.runsService.getConversationContext(converationId)

    const chatHistory = runs.flatMap((run) => [
      {
        sender: 'user' as const,
        text: run.input,
      },
      {
        sender: 'model' as const,
        text: run.output,
      },
    ])
    return chatHistory
  }
}
