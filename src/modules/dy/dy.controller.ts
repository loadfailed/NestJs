import { AuthGuard } from '@nestjs/passport'
import { DyQueryUserDto } from './dto/dyQueryUser.dto'
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe'
import { ResModel } from './../../common/class/index.class'
import { DyService } from './dy.service'
import { BadRequestException, Body, Controller, Request, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import axios from 'axios'

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
  async queryDyUser(@Body() { command }: DyQueryUserDto) {
    const urlParse = /(?<=douyin\.com\/)(\S)+?(?=\/)/.exec(command)
    if (urlParse) {
      const dyUser = await this.dyService.query(urlParse[0])
      return new ResModel(1, { ...dyUser }, '查询成功')
    } else {
      throw new BadRequestException(new ResModel(0, {}, '请输入正确的抖音分享口令'))
    }
  }

  @Get('startWatch')
  @UseGuards(AuthGuard('jwt'))
  startWatch(@Request() { user }) {
    let promiseList = []

    axios({
      url: `https://sc.ftqq.com/SCU42770Td244eee6f2eaa2d962c1828d1e7af72e5c4715bee5346.send?text=${encodeURI('开始监控')}`,
      method: 'get'
    })

    setInterval(() => {
      Promise.all(promiseList)
        .then(() => {
          promiseList = []
          user.following.forEach((id:string) => {
            promiseList.push(this.dyService.watch(id))
          })
        })
    }, 10 * 1000)
    return new ResModel(1, {}, '已开始监控，有更新将会推送到微信')
  }
}
