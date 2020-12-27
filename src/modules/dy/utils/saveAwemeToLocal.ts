import { axiosConfig } from '@/common/config/axios.config'

function fileDataList(ids:Array<string>):Array<Promise<FileData>> {
  const fileDataList:Array<Promise<FileData>> = ids.map(async (id):Promise<FileData> => {
    const url = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${id}&line=0&ratio=720p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&source=PackSourceEnum_DOUYIN_REFLOW`
    const options = {
      url,
      method: 'get',
      headers: axiosConfig,
      responseType: 'stream'
    }
    const { data: stream } = await axios(options)
    const result: FileData = {
      path: id,
      stream
    }
    return result
  })

  return fileDataList
}
