import { PaginatedParamsDto } from '@common/query-params/paginated-params'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Action } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class LogsQueryParams extends PaginatedParamsDto {
  @ApiPropertyOptional({
    enum: Action,
    default: '',
    description: 'Accion',
  })
  @IsEnum(Action)
  @IsOptional()
  logAction: Action
}
