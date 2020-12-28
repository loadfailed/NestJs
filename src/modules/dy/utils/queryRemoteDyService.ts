import { axiosConfig } from '@/common/config/axios.config'
import axios from 'axios'
import { RemoteDyUserInfo } from '../class/RemoteDyUserInfo.class'
import { DyAweme } from '../entity/dyAweme.entity'

const webUrl = 'https://www.iesdouyin.com/web/api/v2'
const appUrl = 'https://aweme-hl.snssdk.com/aweme/v1'

async function queryRemoteDyUserSecUid(u_code:string):Promise<string> {
  try {
    const { request: { path }} = await axios({
      url: `https://v.douyin.com/${u_code}/`,
      method: 'get'
    })
    const sec_uid = /(?<=sec_uid=)\S+?(?=&)/.exec(path)
    if (sec_uid) return sec_uid[0]
    else throw new Error('获取抖音 sec_uid 失败，请检查分享口令是否正确')
  } catch (error) {
    throw new Error(error?.message ?? `请求v.douyin.com/${u_code}/失败`)
  }
}

async function queryRemoteDyUserInfo(sec_uid:string):Promise<RemoteDyUserInfo> {
  try {
    const res = await axios({
      url: `${webUrl}/user/info/?sec_uid=${sec_uid}`,
      method: 'get'
    })
    if (res.data.status_code === 0) {
      const { uid: id, nickname, aweme_count } = res.data.user_info
      return new RemoteDyUserInfo(id, nickname, aweme_count)
    } else {
      throw new Error(res.data.status_msg)
    }
  } catch (error) {
    throw new Error(error?.message ?? '获取抖音用户信息失败')
  }
}

// async function queryRemoteDyUserAwemeList(sec_uid:string):Promise<Array<DyAweme>> {
//   try {
//     const url = `${webUrl}/aweme/post/?sec_uid=${sec_uid}&count=21&max_cursor=0&aid=1128&dytk=`
//     const res = await axios({
//       url,
//       method: 'get',
//       headers
//     })
//     if (res.data.status_code !== 0) throw new Error(res.data.status_msg)
//     const { aweme_list } = res.data
//     return aweme_list.map((v:any) => {
//       const { video } = v

//       if (!video) throw new Error(`已获取 ${sec_uid} 视频列表，但未能获取到视频信息`)

//       const { aweme_id, desc } = v

//       const videoUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${video.vid || video.play_addr?.uri || video.download_addr?.uri}&line=0&ratio=1080p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&source=PackSourceEnum_DOUYIN_REFLOW`

//       const imgUrl = `https://p29-dy.byteimg.com/img/${video.cover.uri}~c5_1200x1600.jpeg?from=2563711402_large`

//       return new DyAweme(aweme_id, videoUrl, imgUrl, desc)
//     })
//   } catch (error) {
//     throw new Error(error?.message ?? `请求 ${webUrl}/aweme/post/?sec_uid=${sec_uid} 失败`)
//   }
// }

// 2321818249593245

async function queryRemoteDyUserAwemeList(id:number | string):Promise<Array<DyAweme>> {
  try {
    const url = `${appUrl}/aweme/post/?user_id=${id}&max_cursor=0&count=20&iid=&aid=2329`
    const res = await axios({
      url,
      method: 'get'
    })
    if (res.data.status_code !== 0) throw new Error(res.data.status_msg)
    const { aweme_list } = res.data
    return aweme_list.map((v:any) => {
      const { video, create_time, aweme_id, is_top } = v

      if (!video) throw new Error(`已获取 ${id} 视频列表，但未能获取到视频信息`)

      const desc = v.desc?.replace(/[@]*[抖音Dou+][\S]*/, '')

      const videoUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${video.play_addr?.uri || video.download_addr?.uri}&line=0&ratio=1080p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&source=PackSourceEnum_DOUYIN_REFLOW`

      const imgUrl = `https://p29-dy.byteimg.com/img/${video.cover.uri}~c5_1080x1920.jpeg?from=2563711402_large`

      return new DyAweme(aweme_id, videoUrl, imgUrl, desc, is_top, create_time)
    })
  } catch (error) {
    throw new Error(error?.message ?? `请求 ${appUrl}/aweme/post/?user_id=${id} 失败`)
  }
}

export {
  queryRemoteDyUserInfo,
  queryRemoteDyUserSecUid,
  queryRemoteDyUserAwemeList
}
