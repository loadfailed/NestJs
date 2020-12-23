import { Injectable } from '@nestjs/common'

@Injectable()
export class DyService {
  async text() {
    console.log('done')
  }
}
