import { RangeDateQueryParams } from '@common/query-params/rangeDate-query-params'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ConversationStatus } from '@prisma/client'
export class ConversationsQueryParams extends RangeDateQueryParams {
  @ApiPropertyOptional({
    enum: ConversationStatus,
    default: '',
    description: 'Estado de la conversación',
  })
  @IsEnum(ConversationStatus)
  @IsOptional()
  conversationStatus: ConversationStatus
}
