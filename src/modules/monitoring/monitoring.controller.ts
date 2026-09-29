import { Controller, Get } from '@nestjs/common'

import { MonitoringService } from './monitoring.service'

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get('/get-runs-analytics')
  async getRunsAnalytics() {
    return await this.monitoringService.getRunsAnalytics()
  }

  @Get('/get-top-inputs')
  async getTopInputs() {
    return await this.monitoringService.getTopInputs()
  }

  @Get('/get-tokens-month')
  async getTokenPerMonth() {
    return await this.monitoringService.getTokensPerMonth()
  }
}
