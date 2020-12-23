import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe'
import { ResModel } from './../../common/class/index.class'
import { DyService } from './dy.service'
import { Controller, Get, HttpException, Param, Post, UsePipes } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import axios from 'axios'
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

  @Get('query/:id')
  @ApiBody({ description: '请输入抖音链接', required: true })
  async query(@Param() params:any) {
    // 请求分享连接获取用户资料
    try {
      const { request: { path }} = await axios({
        url: `https://v.douyin.com/${params.id}/`,
        method: 'get'
      })
      const sec_uid = /(?<=sec_uid=)\S+?(?=&)/.exec(path)

      const res = await axios({
        url: `https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=${sec_uid}`,
        method: 'get'
      })
      return new ResModel(1, { ...res.data.user_info }, 'done')
    } catch (error) {
      throw new Error('获取抖音用户信息失败')
    }
  }
}
