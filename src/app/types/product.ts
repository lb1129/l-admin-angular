export interface ProductType {
  _id: string
  name: string
  brand: string
  category: string
  price: number
  color: string
  style: string
  enable: boolean
  inventory: number
  describe: string
  images: string[]
}

export interface ProductPaginationType {
  pageNo: number
  pageSize: number
  total: number
  data: ProductType[]
}

export interface ProductsQueryParamsType {
  pageNo: number
  pageSize: number
  keyword?: string
}
