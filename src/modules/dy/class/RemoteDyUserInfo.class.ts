import { IsString } from 'class-validator'

export class RemoteDyUserInfo {
  constructor(id:string, nickname:string, aweme_count:number) {
    this.id = id
    this.nickname = nickname
    this.aweme_count = aweme_count
  }

  @IsString()
  readonly id:string;

  @IsString()
  readonly nickname:string;

  @IsString()
  aweme_count:number
}
