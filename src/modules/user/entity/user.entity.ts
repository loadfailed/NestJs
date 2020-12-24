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
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { encryptoPassword } from '@/utils/crypto'
import createMysqlID from '@/utils/createMysqlId'

@Entity()
export class User {
  constructor(username:string, password:string, email:string, mobile:string) {
    this.id = createMysqlID()
    this.username = username
    this.email = email
    this.password = encryptoPassword(password, this.id)
    this.mobile = mobile
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 16 })
  @Index({ unique: true })
  username: string

  @Column({ type: 'varchar', length: 32 })
  email: string | undefined

  @Column({ type: 'varchar', length: 32 })
  password: string | undefined

  @Column({ type: 'varchar', length: 20 })
  mobile: string | undefined

  @Column({ type: 'datetime', default: formatDate(new Date()) })
  createtime: string

  @Column({ type: 'simple-array' })
  following: string[]

  @Column({ type: 'enum', enum: [-1, 0, 1], default: 1 })
  status: number
}
