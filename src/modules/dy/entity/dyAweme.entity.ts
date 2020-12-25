import { formatDate } from '@/utils/formatDate'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DyAweme {
  constructor(id:string, video:string, img:string, desc:string) {
    this.id = id
    this.video = video
    this.img = img
    this.desc = desc
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 512 })
  video: string

  @Column({ type: 'varchar', length: 512 })
  img: string

  @Column({ type: 'varchar', length: 128 })
  desc: string

  @Column({ type: 'datetime', default: formatDate(new Date()) })
  createtime: string

  @Column({ type: 'enum', enum: [-1, 0, 1], default: 1 })
  status: number
}
