import userProductData from './userProductData.json'
import { v4 as uuidv4 } from 'uuid'
import { response } from './tools'
import Mock from 'mockjs'
import queryString from 'query-string'

let productMockData = userProductData

Mock.mock(/api\/product\?.*/, 'get', (req) => {
  const res = queryString.parseUrl(req.url)
  const product = productMockData.find((product) => product.id === res.query['id'])
  if (product) return response(product)
  else return response(null, '产品未找到')
})

Mock.mock(/api\/product\?.*/, 'post', (req) => {
  const product = JSON.parse(req.body)
  const { id } = product
  if (id) {
    const index = productMockData.findIndex((record) => record.id === id)
    productMockData.splice(index, 1, product)
    return response(id)
  } else {
    const newId = uuidv4()
    productMockData.unshift({ ...product, id: newId })
    return response(newId)
  }
})

Mock.mock(/api\/product\?.*/, 'delete', (req) => {
  const ids = JSON.parse(req.body) as string[]
  productMockData = productMockData.filter((product) => ids.indexOf(product.id ?? '') === -1)
  return response(null)
})

Mock.mock(/api\/getProducts\?.*/, 'post', (req) => {
  const { keyword, pagination } = JSON.parse(req.body)
  let data = productMockData
  let total = data.length
  if (keyword) {
    data = productMockData.filter((product) => {
      return product.name.indexOf(keyword) !== -1
    })
    total = data.length
  }
  const { pageNo, pageSize } = pagination
  data = data.slice((pageNo - 1) * pageSize, pageNo * pageSize - 1)
  return response({
    pageNo,
    pageSize,
    total,
    data
  })
})
