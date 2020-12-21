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

import { UserLoginDto } from './dto/userLogin.dto'
import { UserRegisterDto } from './dto/userRegister.dto';
import uRequest from '../../utils/request'
import { User } from './entity/user.entity'

import createMysqlID from '@/utils/createMysqlId'
import formatDate from '@/utils/formatDate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  // findOne(username: string): Promise<User | undefined> {
  //   return new Promise()
  // }

  findOne(username: string) {
    return username
  }

  async register(form:UserRegisterDto){
    const user = new User(form.username,form.password,form.email,form.mobile)
    user.id = createMysqlID()
    user.createtime = formatDate(new Date())
    user.status = 1
    console.log(user.id)
    // 储存到数据库
    // await this.userRepository.save(user)
    // 返回用户ID
    return user.id
    
  }

  async login(form: UserLoginDto) {
    // const options = {
    //   url: 'http://lkong.cn/index.php?mod=login',
    //   method: 'POST',
    //   data: {
    //     email: form.email,
    //     password: form.password,
    //     action: 'login',
    //     rememberme: 'on'
    //   }
    // }
    // console.log('login');
    // return uRequest(options)
    //   .then(res => {
        
    //     const user = new User()
    //     user.id = createMysqlID()
    //     user.username = res.name
    //     user.email = form.email
    //     user.password = form.password
    //     user.mobile = 13165969652
    //     user.createtime = ''
    //     user.status = 1

    //     this.userRepository.save(user)

    //     return res
    //   })
    //   .catch(e => {
    //     throw e
    //   })
  }
}
