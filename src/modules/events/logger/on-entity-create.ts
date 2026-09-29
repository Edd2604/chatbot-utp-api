import { LoggerService } from '@modules/logger/logger.service'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { EntityOperationEvent, LoggerEvents } from './logger-events.interfaces'

@Injectable()
export class OnEntityCreateHandler {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(LoggerEvents.ENTITY_CREATED_EVENT)
  async handleCreated(payload: EntityOperationEvent) {
    const { session, entityId, entity } = payload
    await this.logger.createEntityLog(session, entity, entityId)
  }
}
