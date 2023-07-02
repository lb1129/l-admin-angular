import userData from './userData.json'
import userMenuData from './userMenuData.json'
import { response } from './tools'
import Mock from 'mockjs'
import queryString from 'query-string'

Mock.mock(/api\/login\?.*/, 'post', (req) => {
  const { userName, password } = JSON.parse(req.body)
  const userInfo = userData[userName as keyof typeof userData]
  if (!userInfo || password !== 'a123456') {
    return response(null, '用户名或密码错误', 400)
  }
  const token = userInfo.userName
  return response(token)
})

Mock.mock(/api\/logout\?.*/, 'post', () => {
  return response(null)
})

Mock.mock(/api\/menu\?.*/, 'get', (req) => {
  const { query } = queryString.parseUrl(req.url)
  const token = query['authorization']
  if (token) {
    const menu = userMenuData[token as keyof typeof userMenuData]
    return response(menu)
  } else {
    return response(false, '未登录', 401)
  }
})

Mock.mock(/api\/userInfo\?.*/, 'get', (req) => {
  const { query } = queryString.parseUrl(req.url)
  const token = query['authorization']
  if (token) {
    const userInfo = userData[token as keyof typeof userData]
    return response(userInfo)
  } else {
    return response(false, '未登录', 401)
  }
})

Mock.mock(/api\/isLogin\?.*/, 'get', (req) => {
  const { query } = queryString.parseUrl(req.url)
  const token = query['authorization']
  if (token) {
    return response(true)
  } else {
    return response(false, '未登录', 401)
  }
})
