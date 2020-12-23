import { Controller, Get } from '@nestjs/common'
import { DyService } from './dy.service'

@Controller('dy')
export class DyController {
  constructor(
    private readonly dyService:DyService
  ) {}

    // 查询用户
    @Get()
  test() {
    console.log(this.dyService)
    this.dyService.text()
    return 'dy is working'
  }
}
