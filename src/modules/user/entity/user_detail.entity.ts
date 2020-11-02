/*
 * @Author: your name
 * @Date: 2020-10-07 16:23:01
 * @LastEditTime: 2020-10-07 22:45:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/modules/user/entity/user_detail.entity.ts
 */
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class UserDetail {
  @PrimaryColumn({ type: 'bigint', width: 13 })
  id: number

  @Column({ type: 'bigint', width: 8 })
  lkongid: number

  @Column({ type: 'varchar', length: 16 })
  username: string

  @OneToOne(
    () => User,
    user => user.detail
  )
  @JoinColumn()
  user: User
}
