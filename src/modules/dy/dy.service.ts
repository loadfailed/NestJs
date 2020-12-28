import { formatDate } from '@/utils/formatDate'
import { DyUser } from './entity/dyUser.entity'
import { Injectable, Logger } from '@nestjs/common'
import { Repository, getRepository, createQueryBuilder } from 'typeorm'

import { InjectRepository } from '@nestjs/typeorm'
import { queryRemoteDyUserAwemeList, queryRemoteDyUserInfo, queryRemoteDyUserSecUid } from './utils/queryRemoteDyService'
import { notInDBAweme } from './utils/notInDBAweme'
import { test } from './utils/test'
import { DyAweme } from './entity/dyAweme.entity'
import axios from 'axios'

interface FindDyUser {
    id?:number,
    u_code?:string
}

@Injectable()
export class DyService {
  private readonly logger = new Logger('DyService')
  constructor(
    @InjectRepository(DyUser)
    private readonly dyUserRepository: Repository<DyUser>,

    @InjectRepository(DyAweme)
    private readonly dyAwemeRepository: Repository<DyAweme>
  ) {}

  // 查询抖音用户并保存到数据库
  async createDyUser(u_code:string) {
    const localUser = await this.findOne({ u_code })
    let sec_uid:string
    localUser
      ? sec_uid = localUser.sec_uid
      : sec_uid = await queryRemoteDyUserSecUid(u_code)
    const remoteUser = await queryRemoteDyUserInfo(sec_uid)
    const { id, nickname, aweme_count } = remoteUser
    const aweme_list = await this.queryRemoteAwemeList(id)
    const dyUser = await this.saveDyUser({ id, nickname, aweme_count, u_code, sec_uid })
    await this.saveDyAweme(aweme_list, dyUser)
    return dyUser
  }

  // 储存用户数据
  async saveDyUser({ id, u_code, nickname, aweme_count, sec_uid }):Promise<DyUser> {
    const dyUser = new DyUser(id, u_code, nickname, aweme_count, sec_uid)
    await this.dyUserRepository.save(dyUser)
    return dyUser
  }

  // 更新用户数据
  async updateDyUser(id:number | string, data:any):Promise<DyUser> {
    const dyUser = {
      ...data,
      id,
      updatetime: formatDate(new Date())
    }
    await this.dyUserRepository.save(dyUser)
    return dyUser
  }

  // 储存视频数据
  async saveDyAweme(list:Array<DyAweme>, dyUser:DyUser) {
    const resultList = list.map((v:DyAweme) => {
      v.dyUser = dyUser
      return this.dyAwemeRepository.save(v)
    })
    await Promise.all(resultList)
  }

  // 查询用户数据
  // where date(order_date) between '2019-08-04' and '2019-08-04';
  async findOne(params:FindDyUser):Promise<DyUser> {
    if (params.id || params.u_code) {
      const user = await getRepository(DyUser)
        .createQueryBuilder('dyUser')
        .leftJoinAndSelect('dyUser.aweme_list', 'aweme')
        .where('dyUser.id=:id OR dyUser.u_code=:u_code', { id: params.id, u_code: params.u_code })
        .getOne()
      return user
    } else {
      throw new Error('请输入用户id或u_code')
    }
  }

  // 查询数据库是否已储存视频
  async queryAweme(id:number | string) {
    const aweme = await getRepository(DyAweme)
      .createQueryBuilder('dyAweme')
      .where('dyAweme.id=:id', { id })
      .getOne()
    return aweme
  }

  // 由于每次请求不一定能返回数据，所以要重复请求来判断
  async queryRemoteAwemeList(id:number | string):Promise<Array<DyAweme>> {
    let result:Array<DyAweme> = []
    let count = 0
    const startTime = new Date().getTime()
    while (!result.length) {
      result = await queryRemoteDyUserAwemeList(id)
      count++
    }
    const endTime = new Date().getTime()
    this.logger.log(`请求用户视频列表 ${count} 次耗时 ${(endTime - startTime) / 1000}`)
    return result
  }
}
