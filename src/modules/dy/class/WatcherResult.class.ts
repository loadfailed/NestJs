import { DyAweme } from './../entity/dyAweme.entity'
import { DyUser } from './../entity/dyUser.entity'

export class WatcherResult {
  readonly user:DyUser;
  readonly list:Array<DyAweme>;
}
