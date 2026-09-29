import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ValidateUUID } from '@common/pipes/validate-uuid.pipe'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { Auth } from '@modules/auth/decorators/auth.decorator'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserSession } from '@modules/auth/decorators/user-session.decorator'
import { IUserSession } from '@modules/auth/interfaces/user-session.interface'
import { LoggerEvents } from '@modules/events/logger/logger-events.interfaces'
import { Entity } from '@prisma/client'
import { PublicAccess } from '@modules/auth/decorators/public.decorator'

import { TopicsService } from './topics.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'

@ApiBearerAuth()
@Auth(['ADMIN', 'SUPER_ADMIN'])
@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('create-topic')
  @ApiOperation({ summary: 'Crea un tópico' })
  async createTopic(
    @UserSession() session: IUserSession,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    const topic = await this.topicsService.create(createTopicDto)
    this.eventEmitter.emit(LoggerEvents.ENTITY_CREATED_EVENT, {
      session,
      entity: Entity.Topic,
      entityId: topic.id,
    })
    return topic
  }

  @Get('get-all-topics')
  @ApiOperation({ summary: 'Obtiene todos los Tópicos' })
  getAllTopics(@Query() query: SearchStatusQueryParamsDto) {
    return this.topicsService.getAll(query)
  }

  @PublicAccess()
  @Get('get-available-topics')
  @ApiOperation({ summary: 'Obtiene todos los Tópicos activos' })
  getAvailableTopics() {
    return this.topicsService.getAvailables()
  }

  @Get(':topicId/get-topic')
  @ApiOperation({ summary: 'Obtiene un solo tópico' })
  getTopic(@Param('topicId', ValidateUUID) topicId: string) {
    return this.topicsService.getOneWithDocuments(topicId)
  }

  @Patch(':topicId/update-topic')
  @ApiOperation({ summary: 'Actualiza la información de un tópico' })
  async updateTopic(
    @UserSession() session: IUserSession,
    @Param('topicId', ValidateUUID) topicId: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    const { actualTopic, updatedTopic } = await this.topicsService.update(
      topicId,
      updateTopicDto,
    )

    this.eventEmitter.emit(LoggerEvents.ENTITY_UPDATED_EVENT, {
      session,
      entity: Entity.Topic,
      entityId: actualTopic.id,
      after: updatedTopic,
      before: actualTopic,
    })
    return updatedTopic
  }

  @Delete(':topicId/remove-topic')
  @ApiOperation({ summary: 'Archiva un tópico' })
  async removeTopic(
    @UserSession() session: IUserSession,
    @Param('topicId', ValidateUUID) topicId: string,
  ) {
    const topic = await this.topicsService.remove(topicId)

    this.eventEmitter.emit(LoggerEvents.ENTITY_ARCHIVED_EVENT, {
      session,
      entity: Entity.Topic,
      entityId: topic.id,
    })
    return topic
  }
}
