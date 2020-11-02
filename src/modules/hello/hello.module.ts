import { HelloService } from './hello.service'
import { HelloController } from './hello.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
