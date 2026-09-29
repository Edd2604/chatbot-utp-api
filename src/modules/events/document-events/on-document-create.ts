import { DocumentsService } from '@modules/documents/documents.service'
import { TopicsService } from '@modules/topics/topics.service'
import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'

import {
  DOCUMENT_EVENTS,
  DocumentEventPayload,
} from './document-events.interface'

@Injectable()
export class OnDocumentCreateHandler {
  constructor(
    private readonly events: EventEmitter2,
    private readonly documentService: DocumentsService,
    private readonly topicService: TopicsService,
  ) {}

  @OnEvent(DOCUMENT_EVENTS.ON_DOCUMENT_CREATED)
  async handleCreated(payload: DocumentEventPayload) {
    const size = payload.size.toNumber()
    await this.topicService.updateSizeAndCount(payload.topic_id, size)
  }
}
