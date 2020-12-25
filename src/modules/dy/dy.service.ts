import { DyUser } from './entity/dyUser.entity'
import { Injectable } from '@nestjs/common'
import { Repository, getRepository } from 'typeorm'

import { InjectRepository } from '@nestjs/typeorm'
import { queryRemoteDyUserAwemeList, queryRemoteDyUserInfo, queryRemoteDyUserSecUid } from './utils/queryRemoteDyService'
import { notInDBAweme } from './utils/notInDBAweme'
import { DyAweme } from './entity/dyAweme.entity'
import axios from 'axios'

interface FindDyUser {
    id?:string,
    u_code?:string
}

@Injectable()
export class DyService {
  constructor(
    @InjectRepository(DyUser)
    private readonly dyUserRepository: Repository<DyUser>,

    @InjectRepository(DyAweme)
    private readonly dyAwemerRepository: Repository<DyAweme>
  ) {}

  // 查询抖音用户并保存到数据库
  async query(u_code:string) {
    const localUser = await this.findOne({ u_code })
    let sec_uid:string
    localUser
      ? sec_uid = localUser.sec_uid
      : sec_uid = await queryRemoteDyUserSecUid(u_code)
    const remoteUser = await queryRemoteDyUserInfo(sec_uid)
    const { id, nickname, aweme_count } = remoteUser
    const aweme_list = await this.queryAwemeList(sec_uid)
    const notInDBAwemeList = notInDBAweme(localUser?.aweme_list || [], aweme_list)
    const user = await this.saveDyUser({ id, nickname, aweme_count, u_code, sec_uid,
      aweme_list })
    await this.saveDyAweme(notInDBAwemeList)
    return user
  }

  // 储存用户数据
  async saveDyUser({ id, u_code, nickname, aweme_count, sec_uid, aweme_list }):Promise<DyUser> {
    const aweme_ids = aweme_list.map((v:DyAweme) => v.id)
    const dyUser = new DyUser(id, u_code, nickname, aweme_count, sec_uid, aweme_ids)
    await this.dyUserRepository.save(dyUser)
    return dyUser
  }

  // 储存视频数据
  async saveDyAweme(list:Array<DyAweme>) {
    await getRepository(DyAweme)
      .createQueryBuilder()
      .insert()
      .into(DyAweme)
      .values(list)
      .execute()
  }

  // 查询用户数据
  async findOne(params:FindDyUser):Promise<DyUser> {
    if (params.id || params.u_code) {
      return await this.dyUserRepository.findOne(params)
    } else {
      throw new Error('请输入用户id或u_code')
    }
  }

  // 由于每次请求不一定能返回数据，所以要重复请求来判断
  async queryAwemeList(sec_uid:string):Promise<Array<DyAweme>> {
    let result:Array<DyAweme> = []
    while (!result.length) {
      result = await queryRemoteDyUserAwemeList(sec_uid)
    }
    return result
  }

  async watch(id:string):Promise<void> {
    const localUser = await this.findOne({ id })
    const remoteUser = await queryRemoteDyUserInfo(localUser.sec_uid)
    console.log(localUser.aweme_count, remoteUser.aweme_count)
    if (localUser.aweme_count !== remoteUser.aweme_count) {
      const remote_list = await this.queryAwemeList(localUser.sec_uid)
      const newAwemeList = (localUser.aweme_list, remote_list)
      this.saveDyAweme(newAwemeList)
      // 微信推送通知的逻辑
      axios({
        url: `https://sc.ftqq.com/SCU42770Td244eee6f2eaa2d962c1828d1e7af72e5c4715bee5346.send?text=${encodeURI(localUser.nickname + ' 有更新')}`,
        method: 'get'
      })
    }
    return
  }
}
