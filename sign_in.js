import axios from 'axios'
import { getHeaders } from './lib/http_util.js'
import getCookie from './cookies.js'

async function signIn() {
  const cookies = await getCookie()

  const tokenEntry = cookies.find(entry => entry['SHM_JWT_TOKEN'] !== undefined)
  if (tokenEntry === undefined) {
    throw Error('cannot get authorization')
  }

  let headers = getHeaders()
  headers.authorization = 'JwtUser '.concat(tokenEntry['SHM_JWT_TOKEN'])
  let data = JSON.stringify({
    //请求参数为：{}，经过AES算法加密之后就是: S1uAYaf/g6oBpv8DWUaQlQ==，在前端js代码中搜索encryptBody关键字
    encryptBody: 'S1uAYaf/g6oBpv8DWUaQlQ=='
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.shang-ma.com/api/v1/user/integral/sign-in',
    headers: headers,
    data: data
  }

  const response = await axios.request(config)
  console.log(JSON.stringify(response.data))
  if (response.status !== 200) {
    throw Error('sign in return http status error:' + response.status)
  }
  if (response.data.code !== 0 && response.data.code !== 5001) {
    throw Error('sign in code error:' + response.data.code)
  }
}

export default signIn
