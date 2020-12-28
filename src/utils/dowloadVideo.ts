import { axiosConfig } from '@/common/config/axios.config'
import axios from 'axios'
import { from } from 'rxjs'
import { fs } from 'fs'

export async function downloadVideo(url:string, path:string) {
  const { data: videoStream } = await axios({
    url,
    method: 'get',
    headers: { ...axiosConfig },
    responseType: 'stream'
  })

  // videoStream.pipe(fs.createWriteStream(`${share_title}(无水印).mp4`))
}
