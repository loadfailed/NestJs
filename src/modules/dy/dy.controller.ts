import { DyQueryUserDto } from './DTO/dyQueryUser.dto'
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe'
import { ResModel } from './../../common/class/index.class'
import { DyService } from './dy.service'
import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, UsePipes } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import request from '@/utils/request'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'

@Controller('dy')
export class DyController {
  constructor(
    private readonly dyService:DyService
  ) {}

  @Get()
  default() {
    return new ResModel(1, {}, 'dy is working')
  }

  // 查询抖音用户信息
  @Post('queryDyUser')
  @ApiBody({ description: '请输入用户主页的分享链接', required: true })
  @UsePipes(new JoiValidationPipe())
  async register(@Body() { command }: DyQueryUserDto) {
    const urlParse = /(?<=douyin\.com\/)(\S)+?(?=\/)/.exec(command)
    if (urlParse) {
      const dyUser = await this.dyService.queryDyUserInfo(urlParse[0])
      return new ResModel(1, { ...dyUser }, '查询成功')
    } else {
      throw new BadRequestException(new ResModel(0, {}, '请输入正确的抖音分享口令'))
    }
  }
}
