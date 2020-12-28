import { DyUser } from './entity/dyUser.entity'
import { DyAweme } from './entity/dyAweme.entity'
import { AuthGuard } from '@nestjs/passport'
import { DyQueryUserDto } from './dto/dyQueryUser.dto'
import { JoiValidationPipe } from 'src/common/pipe/joi.validation.pipe'
import { ResModel } from './../../common/class/index.class'
import { DyService } from './dy.service'
import { BadRequestException, Body, Controller, Request, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { queryRemoteDyUserInfo } from './utils/queryRemoteDyService'
import axios from 'axios'

import { CronJob } from 'cron'
import { batchDownloadVideo } from '@/modules/dy/utils/dowloadVideo'
import { WatcherResult } from './class/WatcherResult.class'
import { sendWxMessage } from './utils/sendWxMessage'

const watcher = { }

@Controller('dy')
export class DyController {
  constructor(
    private readonly dyService:DyService
  ) {}

  @Get()
  default() {
    return new ResModel(1, {}, 'dy is working')
  }

  // 创建抖音用户信息
  @Post('createDyUser')
  @ApiBody({ description: '请输入用户主页的分享链接', required: true })
  @UsePipes(new JoiValidationPipe())
  async createDyUser(@Body() { command }: DyQueryUserDto) {
    const urlParse = /(?<=douyin\.com\/)(\S)+?(?=\/)/.exec(command)
    if (urlParse) {
      const dyUser = await this.dyService.createDyUser(urlParse[0])
      return new ResModel(1, { ...dyUser }, '查询成功')
    } else {
      throw new BadRequestException(new ResModel(0, {}, '请输入正确的抖音分享口令'))
    }
  }

  @Get('startWatch')
  @UseGuards(AuthGuard('jwt'))
  startWatch(@Request() { user }) {
    let requsetLock = false
    // 异步查询awemelist
    watcher[user.username] = new CronJob('*/30 * 6-23 * * *', async () => {
      // 如果已经有查询，就跳过本次查询
      if (requsetLock) return

      requsetLock = true

      const queryRemoteDataRequestList:Array<Promise<WatcherResult>> = user.following.reduce((pre:Array<Promise<WatcherResult>>, id:number) => {
        const promise:Promise<WatcherResult> = new Promise(async (resolve) => {
          const localUser = await this.dyService.findOne({ id })
          const remoteUser = await queryRemoteDyUserInfo(localUser.sec_uid)
          if (localUser.aweme_count !== remoteUser.aweme_count) {
            const remoteAwemeList = await this.dyService.queryRemoteAwemeList(localUser.id)

            // 获取新更新的，数据库里还没有的
            const tempIds = localUser.aweme_list.map(v => v.id)
            const news = remoteAwemeList.filter((item:DyAweme) => {
              const now = new Date().getTime()
              const upload = new Date(item.uploadTime).getTime()
              const timeResult = (now - upload) <= (72 * 60 * 60 * 1000)
              const includeResult = !(tempIds.includes(item.id))
              return timeResult && includeResult
            })
            await this.dyService.updateDyUser(localUser.id, { aweme_count: remoteUser.aweme_count })
            await this.dyService.saveDyAweme(news, localUser)
            resolve({
              user: localUser,
              list: news
            })
          } else {
            resolve(new WatcherResult())
          }
        })
        pre.push(promise)
        return pre
      }, [])

      // 获取数据更新
      Promise.all(queryRemoteDataRequestList)
        .then((res:Array<WatcherResult>) => {
          console.log('query', res)
          requsetLock = false
          const list = res.filter(v => v.user)
          sendWxMessage(list, 'SCU42770Td244eee6f2eaa2d962c1828d1e7af72e5c4715bee5346')
          // sendWxMessage(list, 'SCU42770Td244eee6f2eaa2d962c1828d1e7af72e5c4715bee5346')
          // batchDownloadVideo(list)
          //   .then(res => {
          //     console.log(res)
          //   })
        })
    }, null, true)

    return new ResModel(1, {}, '已开始监控，有更新将会推送到微信')
  }

  @Get('queryDyUser')
  async queryDyUser(@Request() { query: { id, u_code }}) {
    const user = await this.dyService.findOne({ id, u_code })
    return new ResModel(1, user, '1')
  }

  @Get('stopWatch')
  @UseGuards(AuthGuard('jwt'))
  stopWatch(@Request() { user }) {
    watcher[user.username]?.stop()
    return new ResModel(1, {}, '已停止监控')
  }
}

// lock = false

