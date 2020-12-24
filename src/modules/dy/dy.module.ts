import { TypeOrmModule } from '@nestjs/typeorm'
import { DyController } from './dy.controller'
import { Module } from '@nestjs/common'
import { DyService } from './dy.service'
import { DyUser } from './entity/dyUser.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DyUser])],
  providers: [DyService],
  controllers: [DyController]
})
export class DyModule {}
