import { Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { ValidateUUID } from '@common/pipes/validate-uuid.pipe'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ConversationsService } from './conversations.service'
import { ConversationsQueryParams } from './query-params/conversations-query-params'

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get('get-all-conversations')
  @ApiOperation({
    summary: 'Obtiene todas las conversaciones generadas en el sistema',
  })
  async getAllConversations(@Query() query: ConversationsQueryParams) {
    return await this.conversationsService.getAll(query)
  }

  @Get(':conversationId/get-conversation')
  @ApiOperation({
    summary: 'Obtiene una conversación junto a sus ejecuciones generadas',
  })
  async getConversation(@Param('conversationId', ValidateUUID) id: string) {
    return await this.conversationsService.getOneWithRuns(id)
  }

  @Patch(':conversationId/close-conversation')
  @ApiOperation({
    summary: 'Obtiene una conversación junto a sus ejecuciones generadas',
  })
  async closeConversation(@Param('conversationId', ValidateUUID) id: string) {
    return await this.conversationsService.close(id)
  }
}
