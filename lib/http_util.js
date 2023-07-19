import sign from './shangma_utils.js'
import dotenv from 'dotenv'

dotenv.config()

const APP_ID = '5PFuGr3Q7AA0vbJAFior'
const DEVICE_ID = 'Z8T23iCPme3DWGRAQLpJO2w0qY2Kq9-R'
const CHANNEL = 'windows-PC'
const noncesr = Date.now()
const ts = Math.floor(noncesr / 1000)

function concatParams(signParams) {
  const paramsString = Object.entries(signParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `${paramsString}`
}

function getSignParam() {
  const signParams = {
    appid: APP_ID,
    channel: CHANNEL,
    device_id: DEVICE_ID,
    language: 'zh-CN',
    model: '',
    noncesr: noncesr,
    sys_version: '',
    ts: ts,
    version: 'V1.0'
  }
  return signParams
}

function getLoginSignParam(username, password) {
  const signParams = {
    appid: APP_ID,
    channel: CHANNEL,
    device_id: DEVICE_ID,
    language: 'zh-CN',
    model: '',
    noncesr: noncesr,
    password: password,
    sys_version: '',
    ts: ts,
    username: username,
    version: 'V1.0'
  }
  return signParams
}

function getMarathonHeaders(isLogin = false) {
  let signParams = getSignParam()
  if (isLogin) {
    const username = process.env.SM_USERNAME
    const password = process.env.SM_PASSWORD
    signParams = getLoginSignParam(username, password)
  }
  let param = concatParams(signParams) + 'xbbaUe8PPVblLWaVP-iIJnUGhnDXmrm_'
  const signature = sign(param)
  return {
    'Marathon-App-Id': APP_ID,
    'Marathon-Device-Id': DEVICE_ID,
    'Marathon-Ts': ts,
    'Marathon-Noncesr': noncesr,
    'Marathon-Language': 'zh-CN',
    'Marathon-Sign': signature,
    'Marathon-Version': 'V1.0',
    'Marathon-Model': '',
    'Marathon-Sys-Version': '',
    'Marathon-Channel': CHANNEL
  }
}

function getCommonHeaders() {
  const localHeaders = {
    authority: 'www.shang-ma.com',
    accept: 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6',
    'content-type': 'application/json',
    referer: 'https://www.shang-ma.com/',
    'sec-ch-ua':
      '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
  return localHeaders
}

export function getLoginHeaders() {
  const loginMarathonHeaders = getMarathonHeaders(true)
  return Object.assign({}, loginMarathonHeaders, getCommonHeaders())
}

export function getHeaders() {
  const marathonHeaders = getMarathonHeaders()
  return Object.assign({}, marathonHeaders, getCommonHeaders())
}

export function cookiesToString(data) {
  return data
    .map(cookie => {
      const [key, value] = Object.entries(cookie)[0] // 取出字典的键值对
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('; ')
}
