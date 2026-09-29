import { Module } from '@nestjs/common'

import { DocumentsService } from './documents.service'
import { DocumentsController } from './controllers/documents.controller'
import { DocumentsInTopicController } from './controllers/documents-in-topic.controller'

@Module({
  exports: [DocumentsService],
  controllers: [DocumentsController, DocumentsInTopicController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
