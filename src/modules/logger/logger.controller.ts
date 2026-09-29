import { Controller, Get, Query } from '@nestjs/common'
// import { ApiBearerAuth } from '@nestjs/swagger'
// import { Auth } from '@auth/decorators/auth.decorator'
import { ApiOperation } from '@nestjs/swagger'

import { LoggerService } from './logger.service'
import { LogsQueryParams } from './query-params/logs-query-params'

@Controller('Logs')
export class LoggerController {
  constructor(private readonly logger: LoggerService) {}

  @Get('get-all-logs')
  @ApiOperation({ summary: 'Obtiene todos los logs de entidades' })
  async findAll(@Query() query: LogsQueryParams) {
    return await this.logger.getAll(query)
  }
}
