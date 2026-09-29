import { Module } from '@nestjs/common'

import { TopicsService } from './topics.service'
import { TopicsController } from './topics.controller'

@Module({
  exports: [TopicsService],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
