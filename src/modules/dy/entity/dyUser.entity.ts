import formatDate from '@/utils/formatDate'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DyUser {
  constructor(id:string, u_code:string, nickname:string, aweme_count:number, sec_uid:string) {
    this.id = id
    this.u_code = u_code
    this.nickname = nickname
    this.aweme_count = aweme_count
    this.sec_uid = sec_uid
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 20 })
  u_code: string

  @Column({ type: 'varchar', length: 32 })
  nickname: string

  @Column({ type: 'varchar', length: 128 })
  sec_uid: string

  @Column({ type: 'int' })
  aweme_count:number

  @Column({ type: 'datetime', default: formatDate(new Date()) })
  createtime: string

  @Column({ type: 'enum', enum: [-1, 0, 1], default: 1 })
  status: number
}
