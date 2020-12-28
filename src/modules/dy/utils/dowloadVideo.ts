import { DyAweme } from './../entity/dyAweme.entity'
import { WatcherResult } from './../class/WatcherResult.class'
import { axiosConfig } from '@/common/config/axios.config'
import axios from 'axios'
import { createWriteStream } from 'fs'

interface FotmatData{
  url:string,
  vid:string,
  uid:string
}

export async function batchDownloadVideo(list:Array<WatcherResult>) {
  const result = list.reduce((pre:Array<FotmatData>, cur:WatcherResult) => {
    const data:Array<FotmatData> = cur.list.map((item:DyAweme) => {
      return {
        url: item.video,
        vid: item.id,
        uid: cur.user.id
      }
    })
    pre.push(...data)
    return pre
  }, [])

  const promiseList = result.map(v => downloadVideo(v.url, v.uid, v.vid))

  return Promise.all(promiseList)
}

async function downloadVideo(url:string, uid:string, vid:string):Promise<boolean> {
  const { data: videoStream } = await axios({
    url,
    method: 'get',
    headers: { ...axiosConfig },
    responseType: 'stream'
  })

  return new Promise(async (resolve, reject) => {
    const wstream = createWriteStream(`./aweme/${uid}/${vid}.mp4`)
    videoStream.pipe(wstream)
    wstream.on('finish', () => {
      resolve(true)
    })
    wstream.on('error', () => {
      reject(false)
    })
  })
}
