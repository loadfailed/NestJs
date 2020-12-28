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
    let lock = false

    // 异步查询awemelist
    watcher[user.username] = new CronJob('*/10 * * * * *', () => {
      // 如果已经有查询，就跳过本次查询
      if (lock) return

      lock = true

      const saveToDB:Array<Promise<any>> = []

      const requestList = user.following.reduce((pre:Array<Promise<Array<DyAweme>>>, id:number) => {
        let localUser:DyUser
        const localAwemeList:Array<string> = []
        const promise = this.dyService.findOne({ id })
          .then((res:DyUser) => {
            localUser = res
            res.aweme_list.forEach((v:DyAweme) => (localAwemeList.push(v.id)))
            return queryRemoteDyUserInfo(res.sec_uid)
          })
          .then((res:DyUser) => {
            if (localUser.aweme_count !== res.aweme_count) {
              saveToDB.push(this.dyService.updateDyUser(localUser.id, { aweme_count: res.aweme_count }))
              return this.dyService.queryRemoteAwemeList(localUser.id)
            }
          })
          .then((res:Array<DyAweme>) => {
            if (!res) return []
            // 获取新更新的，数据库里还没有的
            const news = res.filter((item:DyAweme) => {
              const now = new Date().getTime()
              const upload = new Date(item.uploadTime).getTime()
              const timeResult = (now - upload) <= (10 * 60 * 60 * 1000)
              const includeResult = !localAwemeList.includes(item.id)
              return timeResult && includeResult
            })
            saveToDB.push(this.dyService.saveDyAweme(news, localUser))
            return news
          })
        pre.push(promise)
        return pre
      }, [])

      // 数据推送到微信
      Promise.all(requestList)
        .then((res:Array<any>) => {
          const list:Array<DyAweme> = res.reduce((pre:Array<DyAweme>, cur:Array<DyAweme>) => ([...pre, ...cur]), [])
          if (!list.length) return
          const text = `更新了${list.length}个视频`
          const desp = list.reduce((pre, cur) => {
            pre += `
![logo](${cur.img})

视频编号：${cur.id}，

上传时间：${cur.uploadTime}，

描述：${cur.desc}，

视频地址：${cur.video}，

____________________

____________________

`
            return pre
          }, '')
          axios({
            url: 'https://sc.ftqq.com/SCU42770Td244eee6f2eaa2d962c1828d1e7af72e5c4715bee5346.send',
            params: {
              text,
              desp
            }
          })
        })

      // 数据储存到服务器本地
      Promise.all(saveToDB)
        .then(() => {
          lock = false
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
    watcher[user.username].stop()
    return new ResModel(1, {}, '已停止监控')
  }
}

// lock = false

