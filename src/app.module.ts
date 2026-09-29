import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ReniecModule } from '@providers/reniec/reniec.module'
import { EventsModule } from '@modules/events/events.module'
import { PusherModule } from '@providers/pusher/pusher.module'

import { ChatModule } from './modules/chat/chat.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './providers/prisma/prisma.module'
import { LoggerModule } from './modules/logger/logger.module'
import { CloudinaryModule } from './providers/cloudinary/cloudinary.module'
import { GeminiAIModule } from './providers/gemini-ai/gemini-ai.module'
import { TopicsModule } from './modules/topics/topics.module'
import { GeminiChatRunnerModule } from './modules/orchestrators/gemini-chat-runner/gemini-chat-runner.module'
import { ConversationsModule } from './modules/conversations/conversations.module'
import { DocumentsModule } from './modules/documents/documents.module'
import { RunsModule } from './modules/runs/runs.module'
import { MonitoringModule } from './modules/monitoring/monitoring.module'

@Module({
  imports: [
    ChatModule,
    PrismaModule,
    LoggerModule,
    CloudinaryModule,
    GeminiAIModule,
    ReniecModule,
    AuthModule,
    PusherModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    TopicsModule,
    GeminiChatRunnerModule,
    ConversationsModule,
    DocumentsModule,
    RunsModule,
    EventsModule,
    MonitoringModule,
  ],
})
export class AppModule {}
