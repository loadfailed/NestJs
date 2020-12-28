import axios from 'axios'
import { WatcherResult } from '../class/WatcherResult.class'

export function sendWxMessage(list:Array<WatcherResult>, token:string) {
  if (!list.length) return
  const text = `检测到有${list.length}个用户更新了视频`
  const desp = list.reduce((desp, item) => {
    const message = item.list?.reduce((pre, cur) => {
      pre += `
![logo](${cur.img})

视频编号：${cur.id}

上传用户：${item.user.nickname}

上传时间：${cur.uploadTime}

描述：${cur.desc}

视频地址：${cur.video}

____________________

____________________

`
      return pre
    }, '')
    desp += message
    return desp
  }, '')
  axios({
    url: `https://sc.ftqq.com/${token}.send`,
    params: {
      text,
      desp
    }
  })
}
