import { DyController } from './dy.controller'
import { Module } from '@nestjs/common'
import { DyService } from './dy.service'

@Module({
  providers: [DyService],
  controllers: [DyController]
})
export class DyModule {}
