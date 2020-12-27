import { DyAweme } from './dyAweme.entity'
import { formatDate } from '@/utils/formatDate'
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DyUser {
  constructor(id:string, u_code:string, nickname:string, aweme_count:number, sec_uid:string, aweme_list?:Array<DyAweme>) {
    this.id = id
    this.u_code = u_code
    this.nickname = nickname
    this.aweme_count = aweme_count
    this.sec_uid = sec_uid
    this.updatetime = formatDate(new Date())
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 20 })
  @Index({ unique: true })
  u_code: string

  @Column({ type: 'varchar', length: 32 })
  nickname: string

  @Column({ type: 'varchar', length: 128 })
  sec_uid: string

  @Column({ type: 'int' })
  aweme_count:number

  @Column({ type: 'datetime', default: formatDate(new Date()) })
  createtime: string

  @Column({ type: 'datetime', default: formatDate(new Date()) })
  updatetime: string

  @Column({ type: 'enum', enum: [-1, 0, 1], default: 1 })
  status: number

  @OneToMany(type => DyAweme, aweme => aweme.dyUser)
  aweme_list:Array<DyAweme>
}
