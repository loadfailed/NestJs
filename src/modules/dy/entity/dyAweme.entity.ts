import { DyUser } from './dyUser.entity'
import { formatDate } from '@/utils/formatDate'
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'

@Entity()
export class DyAweme {
  constructor(id:string, video:string, img:string, desc:string, isTop:number, uploadTime:number) {
    this.id = id
    this.video = video
    this.img = img
    this.desc = desc
    this.isTop = isTop
    this.uploadTime = formatDate(new Date(uploadTime * 1000))
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

  @Column({ type: 'datetime' })
  uploadTime: string

  @Column({ type: 'enum', enum: [0, 1] })
  isTop:number

  @Column({ type: 'enum', enum: [-1, 0, 1], default: 1 })
  status: number

  @ManyToOne(type => DyUser, dyUser => dyUser.aweme_list, { cascade: true })
  @JoinTable()
  dyUser:DyUser
}
