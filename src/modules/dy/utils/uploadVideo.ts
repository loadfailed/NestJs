import { clearConfigCache } from 'prettier'
import * as puppeteer from 'puppeteer'
// const puppeteer
export async function uploadToTencent() {
  // const browserFetcher = puppeteer.createBrowserFetcher();
  const browser = await puppeteer
    .launch({
      args: ['--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      headless: true
    // devtools:true
    })

  const page = await browser.newPage()
  const userAgent = 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36'
  await page.setCacheEnabled(false)
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto('https://om.qq.com/userAuth/index')

  const loginBtn = await page.$('.login-type-qq')
  await loginBtn.click()
  await page.waitForTimeout(3 * 1000)
  const iframeFather = await page.$('.login-container iframe')
  // console.log(iframe.content());
  const father = await iframeFather.contentFrame()
  await father.waitForSelector('.page_login')
  const iframeChild = await father.$('#ptlogin_iframe')
  const child = await iframeChild.contentFrame()
  await child.waitForSelector('.login')
  const loginForPwd = await child.$('#switcher_plogin')
  await loginForPwd.click()
  const loginForm = await child.$('#loginform')
  const qq = await loginForm.$('.uinArea #u')
  await qq.type('190766630')
  const password = await loginForm.$('#pwdArea #p')
  await password.type('@zxc266419')
  const submitLoginForm = await loginForm.$('.submit')
  await submitLoginForm.click()
  await page.waitForTimeout(3 * 1000)
  await page.screenshot({ path: `qq.png` })

  // const loginBtin = await iframeContent.$('a')
  // console.log(loginBtin.getProperties())
  // console.log(test)
  // await test.click()
  // await page.screenshot({ path: `qq2.png` })

  // const editBtn = await page.$('.omui-button--lg')
  // await editBtn.click()
  // await page.waitForTimeout(10 * 1000)
  // await page.screenshot({ path: `qq3.png` })

  // const videoBtn = await page.$$('.tab_item-clsl_DGJ')
  // videoBtn[2].click()
  // await page.waitForTimeout(3 * 1000)
  // await page.screenshot({ path: `qq4.png` })

  // const firtUploadBtn = await page.$('.container-cls13xY_ .omui-button--add')
  // await firtUploadBtn.click()
  // await page.waitForTimeout(3 * 1000)
  // await page.screenshot({ path: `qq5.png` })

  // const secondUploadBtn = await page.$('.uploadfileBox-cls1wycs input')
  // await secondUploadBtn.uploadFile('./test.mp4')
  // await page.waitForTimeout(3 * 60 * 1000)
  // await page.screenshot({ path: `qq6.png` })
}
