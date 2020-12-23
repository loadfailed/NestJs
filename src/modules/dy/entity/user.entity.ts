import formatDate from '@/utils/formatDate'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  constructor(id:string, username:string, password:string, email:string, mobile:string) {
    this.id = id
    this.createtime = formatDate(new Date())
    this.status = 1
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 20 })
  mobile: string | undefined

  @Column({ type: 'datetime' })
  createtime: string | undefined

  @Column({ type: 'tinyint' })
  status: number | undefined
}
