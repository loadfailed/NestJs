import { DyController } from './dy.controller'
import { DyService } from './dy.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [DyService],
  controllers: [DyController]
})
export class DyModule {}
