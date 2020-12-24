import { DyUser } from './entity/dyUser.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import axios from 'axios'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class DyService {
  constructor(
    @InjectRepository(DyUser)
    private readonly dyUserRepository: Repository<DyUser>
  ) {}

  async queryDyUserInfo(u_code:string) {
    try {
      const sec_uid = await this.queryDyUserSecUid(u_code)
      const res = await axios({
        url: `https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=${sec_uid}`,
        method: 'get'
      })
      if (res.data.status_code === 0) {
        return this.saveDyUser({ ...res.data.user_info, u_code, sec_uid })
      } else {
        throw new Error(res.data.status_msg)
      }
    } catch (error) {
      throw new Error(error?.message ?? '获取抖音用户信息失败')
    }
  }

  async queryDyUserSecUid(u_code:string):Promise<string> {
    // 请求分享连接获取用户资料
    const { request: { path }} = await axios({
      url: `https://v.douyin.com/${u_code}/`,
      method: 'get'
    })
    const sec_uid = /(?<=sec_uid=)\S+?(?=&)/.exec(path)
    if (!sec_uid) throw new Error('获取抖音 sec_uid 失败')
    return sec_uid[0]
  }

  async saveDyUser({ uid: id, u_code, nickname, aweme_count, sec_uid }) {
    const dyUser = new DyUser(id, u_code, nickname, aweme_count, sec_uid)
    await this.dyUserRepository.save(dyUser)
    return dyUser
  }
}
