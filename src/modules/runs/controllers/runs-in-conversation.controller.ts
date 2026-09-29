import { ValidateUUID } from '@common/pipes/validate-uuid.pipe'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { RunsService } from '../runs.service'

@Controller('Conversations')
export class RunsInConversationController {
  constructor(private readonly runsService: RunsService) {}

  @Get(':conversationId/runs/get-runs-by-conversation')
  @ApiOperation({ summary: 'Obiene todas las ejecuciones de una conversacion' })
  getAllRunsByConversation(
    @Param('conversationId', ValidateUUID) conversationId: string,
  ) {
    return this.runsService.getAllByConversation(conversationId)
  }
}
