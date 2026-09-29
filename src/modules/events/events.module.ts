import { Module } from '@nestjs/common'
import { ConversationsModule } from '@modules/conversations/conversations.module'
import { RunsModule } from '@modules/runs/runs.module'
import { LoggerModule } from '@modules/logger/logger.module'
import { TopicsModule } from '@modules/topics/topics.module'
import { DocumentsModule } from '@modules/documents/documents.module'

import { OnRunExecuteHandler } from './run-events/on-run-execute'
import { OnEntityArchiveHandler } from './logger/on-entity-archive'
import { OnEntityCreateHandler } from './logger/on-entity-create'
import { OnEntityUpdateHandler } from './logger/on-entity-update'
import { OnDocumentCreateHandler } from './document-events/on-document-create'
import { OnDocumentRemoveHandler } from './document-events/on-document-remove'

@Module({
  providers: [
    OnRunExecuteHandler,
    OnDocumentCreateHandler,
    OnDocumentRemoveHandler,
    OnEntityArchiveHandler,
    OnEntityCreateHandler,
    OnEntityUpdateHandler,
  ],
  imports: [
    ConversationsModule,
    RunsModule,
    LoggerModule,
    DocumentsModule,
    TopicsModule,
  ],
})
export class EventsModule {}
