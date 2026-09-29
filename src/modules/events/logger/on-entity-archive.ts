import { LoggerService } from '@modules/logger/logger.service'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { EntityOperationEvent, LoggerEvents } from './logger-events.interfaces'

@Injectable()
export class OnEntityArchiveHandler {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(LoggerEvents.ENTITY_ARCHIVED_EVENT)
  async handleArchived(payload: EntityOperationEvent) {
    const { session, entity, entityId } = payload
    await this.logger.deleteEntityLog(session, entity, entityId)
  }
}
