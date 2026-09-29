import { LoggerService } from '@modules/logger/logger.service'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { EntityOperationEvent, LoggerEvents } from './logger-events.interfaces'

@Injectable()
export class OnEntityUpdateHandler {
  constructor(private readonly logger: LoggerService) {}

  @OnEvent(LoggerEvents.ENTITY_UPDATED_EVENT)
  async handleUpdated(payload: EntityOperationEvent) {
    const { session, entityId, entity, after, before } = payload
    await this.logger.updateEntityLog(session, entity, entityId, after, before)
  }
}
