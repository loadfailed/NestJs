/*
 * @Author: your name
 * @Date: 2020-10-07 04:25:16
 * @LastEditTime: 2020-10-07 23:00:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/modules/user/entity/user.entity.ts
 */
// import { UserDetail } from './user_dy_following.entity'
import formatDate from '@/utils/formatDate'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  constructor(id:string, username:string, password:string, email:string, mobile:string) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.mobile = mobile
    this.createtime = formatDate(new Date())
    this.status = 1
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 16 })
  username: string | undefined

  @Column({ type: 'varchar', length: 32 })
  email: string | undefined

  @Column({ type: 'varchar', length: 32 })
  password: string | undefined

  @Column({ type: 'varchar', length: 20 })
  mobile: string | undefined

  @Column({ type: 'datetime' })
  createtime: string | undefined

  @Column({ type: 'tinyint' })
  status: number | undefined
}
