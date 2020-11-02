/*
 * @Author: your name
 * @Date: 2020-09-27 02:46:26
 * @LastEditTime: 2020-11-03 02:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/modules/user/user.service.ts
 */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserLoginDto } from './dto/user_login.dto'
import uRequest from '../../utils/request'
import { User } from './entity/user.entity'
import { UserDetail } from './entity/user_detail.entity'

import mysqlID from '../../utils//mysql_id'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>
  ) {}

  // findOne(username: string): Promise<User | undefined> {
  //   return new Promise()
  // }

  findOne(username: string) {
    return username
  }

  async login(form: UserLoginDto) {
    const options = {
      url: 'http://lkong.cn/index.php?mod=login',
      method: 'POST',
      data: {
        email: form.email,
        password: form.password,
        action: 'login',
        rememberme: 'on'
      }
    }

    return uRequest(options)
      .then(res => {
        const user = new User()
        user.id = mysqlID()
        user.lkongid = res.uid
        user.username = res.name
        user.email = form.email
        user.password = form.password
        user.phone = 13165969652
        user.openid = ''

        const userDetail = new UserDetail()
        userDetail.id = mysqlID()
        userDetail.lkongid = user.lkongid
        userDetail.username = user.username
        userDetail.user = user

        this.userRepository.save(user)
        this.userDetailRepository.save(userDetail)

        return res
      })
      .catch(e => {
        throw e
      })
  }
}
