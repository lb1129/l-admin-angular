import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { product_api, products_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import type { ProductType, ProductsQueryParamsType } from './types'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductById(id: string) {
    return this.http.get<IResponse<ProductType>>(product_api, {
      params: {
        id
      }
    })
  }

  saveProduct(product: ProductType) {
    return this.http.post<IResponse<string>>(product_api, product)
  }

  deleteProductByIds(ids: string[]) {
    return this.http.delete<IResponse<null>>(product_api, {
      body: ids
    })
  }

  getProducts(params: ProductsQueryParamsType) {
    return this.http.post<
      IResponse<{
        pageNo: number
        pageSize: number
        total: number
        data: ProductType[]
      }>
    >(products_api, params)
  }
}
