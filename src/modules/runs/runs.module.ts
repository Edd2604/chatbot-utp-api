import { Module } from '@nestjs/common'

import { RunsService } from './runs.service'
import { RunsController } from './controllers/runs.controller'

@Module({
  controllers: [RunsController],
  providers: [RunsService],
  exports: [RunsService],
})
export class RunsModule {}
