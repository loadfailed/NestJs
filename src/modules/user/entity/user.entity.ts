/*
 * @Author: your name
 * @Date: 2020-10-07 04:25:16
 * @LastEditTime: 2020-10-07 23:00:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/modules/user/entity/user.entity.ts
 */
import { UserDetail } from './user_detail.entity'
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ type: 'bigint', width: 13 })
  id: number

  @Column({ type: 'bigint', width: 8 })
  lkongid: number

  @Column({ type: 'varchar', length: 16 })
  username: string

  @Column({ type: 'varchar', length: 32 })
  email: string

  @Column({ type: 'varchar', length: 64 })
  password: string

  @Column({ type: 'bigint', width: 11 })
  phone: number

  @Column({ type: 'varchar', length: 64 })
  openid: string

  @OneToOne(
    () => UserDetail,
    userDetail => userDetail.user
  )
  detail: UserDetail
}
