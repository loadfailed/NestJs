import axios from 'axios'

// 抖音极速版
export async function test() {
  const res = await axios({
    url: 'https://aweme-hl.snssdk.com/aweme/v1/aweme/post/?user_id=100993403579&max_cursor=0&count=20&iid=2321818249593245&aid=2329',
    method: 'get'
  })
  return res.data.aweme_list
}

// export async function test() {
//   const res = await axios({
//     url: 'https://aweme-eagle-hl.snssdk.com/aweme/v1/user/?user_id=100993403579&retry_type=no_retry&iid=2321818249593245&device_id=3940299365156638&ac=wifi&channel=xiaomi&aid=2329&app_name=douyin_lite&version_code=290&version_name=2.9.0&device_platform=android&ssmix=a&device_type=SM-G9750&device_brand=samsung&language=zh&os_api=22&os_version=5.1.1&uuid=865166023529004&openudid=50e8c9429ee5eae9&manifest_version_code=290&resolution=1600*900&dpi=240&update_version_code=2900&_rticket=1608984039582&cdid=e77f352e-fb9c-4a55-8d96-77a5f1e56e9b&ts=1608998594&as=a111111111111111111111&cp=a000000000000000000000&mas=null',
//     method: 'get'
//   })
//   console.log(res.data)
//   return res.data
// }

// https://aweme-eagle-hl.snssdk.com/aweme/v1/user/?user_id=100993403579&retry_type=no_retry&iid=2321818249593245&device_id=3940299365156638&ac=wifi&channel=xiaomi&aid=2329&app_name=douyin_lite&version_code=290&version_name=2.9.0&device_platform=android&ssmix=a&device_type=SM-G9750&device_brand=samsung&language=zh&os_api=22&os_version=5.1.1&uuid=865166023529004&openudid=50e8c9429ee5eae9&manifest_version_code=290&resolution=1600*900&dpi=240&update_version_code=2900&_rticket=1608984039582&cdid=e77f352e-fb9c-4a55-8d96-77a5f1e56e9b&ts=1608998594&as=a111111111111111111111&cp=a000000000000000000000&mas=null

// 抖音极速版用户中心
// https://aweme-hl.snssdk.com/aweme/v1/aweme/post/?user_id=100993403579&max_cursor=0&count=20&retry_type=no_retry&iid=2321818249593245&device_id=3940299365156638&ac=wifi&channel=xiaomi&aid=2329&app_name=douyin_lite&version_code=290&version_name=2.9.0&device_platform=android&ssmix=a&device_type=SM-G9750&device_brand=samsung&language=zh&os_api=22&os_version=5.1.1&uuid=865166023529004&openudid=50e8c9429ee5eae9&manifest_version_code=290&resolution=1600*900&dpi=240&update_version_code=2900&_rticket=1608984039586&cdid=e77f352e-fb9c-4a55-8d96-77a5f1e56e9b&ts=1608998594&as=a111111111111111111111&cp=a000000000000000000000&mas=null

