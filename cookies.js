import axios from 'axios'
import cookieParser from 'set-cookie-parser'
import {
  getHeaders,
  getLoginHeaders,
  cookiesToString
} from './lib/http_util.js'
import { encrypt } from './lib/encrypt.js'

async function getAttachCookies(url, cookies = []) {
  const headers = getHeaders()
  headers.authority = 'passport.shang-ma.com'
  headers.referer = 'https://passport.shang-ma.com'

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    validateStatus: status => {
      return status >= 200 && status < 400
    },
    maxRedirects: 0, // 设置为 0 禁止重定向
    url: url,
    headers: headers
  }

  let verify
  try {
    const response = await axios.request(config)
    verify = response.data.verify
    const setCookieHeader = response.headers['set-cookie']
    if (setCookieHeader) {
      const parsedCookies = cookieParser.parse(setCookieHeader)
      const cookieDictList = parsedCookies.reduce((acc, cookie) => {
        const { name, value, maxAge } = cookie
        if (maxAge === undefined || maxAge > 0) {
          acc.push({ [name]: value })
        }
        return acc
      }, [])
      cookies.push(...cookieDictList)
    }
    if (
      response.status >= 300 &&
      response.status < 400 &&
      response.headers.location
    ) {
      return getAttachCookies(response.headers.location, cookies)
    } else {
      if (verify) {
        cookies.push({ sso_verify_passport: verify })
      }
    }
  } catch (error) {
    console.error('请求出错：', error)
  }

  return cookies
}

async function getInitCookies() {
  const url = 'https://passport.shang-ma.com/api/sso/client/attach'
  return getAttachCookies(url)
}

async function getLoginCookies(initCookie) {
  const loginCookies = []
  loginCookies.push(...initCookie)
  const headers = getLoginHeaders(true)
  headers.cookie = cookiesToString(initCookie)
  headers.authority = 'passport.shang-ma.com'
  headers.referer = 'https://passport.shang-ma.com'
  headers.authorization =
    'JwtApp eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.MmwTuGPzzXKkDFQOX9Gn-Av9YO9J_4Q7LXeXr23js20'

  const username = process.env.SM_USERNAME
  const password = process.env.SM_PASSWORD
  const encryptBody = encrypt(
    JSON.stringify({ username: username, password: password })
  )
  let data = JSON.stringify({
    encryptBody: encryptBody
  })
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://passport.shang-ma.com/api/login/index',
    headers: headers,
    data: data
  }

  const response = await axios.request(config)

  if (response.headers['set-cookie']) {
    const parsedCookies = cookieParser.parse(response.headers['set-cookie'])
    const targetCookie = parsedCookies.find(
      cookie => cookie.name === 'SHM_JWT_TOKEN'
    )
    if (targetCookie) {
      loginCookies.push({ SHM_JWT_TOKEN: targetCookie.value })
    } else {
      console.error('get SHM_JWT_TOKEN failed ')
    }
  }
  return loginCookies
}

export default async function getCookie() {
  const cookies = await getInitCookies()
  const loginCookies = await getLoginCookies(cookies)
  return loginCookies
}

// getCookie()
