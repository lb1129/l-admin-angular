import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  product_get_by_id_api,
  product_save_api,
  product_delete_api,
  products_api
} from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import type { ProductType, ProductsQueryParamsType } from '@/app/types/product'

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProductById(id: string) {
    return this.httpClient.get<IResponse<ProductType>>(product_get_by_id_api, {
      params: {
        id
      }
    })
  }

  saveProduct(product: ProductType) {
    return this.httpClient.post<IResponse<string>>(product_save_api, product)
  }

  deleteProductByIds(ids: string[]) {
    return this.httpClient.delete<IResponse<null>>(product_delete_api, {
      body: {
        ids
      }
    })
  }

  getProducts(params: ProductsQueryParamsType) {
    return this.httpClient.post<
      IResponse<{
        pageNo: number
        pageSize: number
        total: number
        data: ProductType[]
      }>
    >(products_api, params)
  }
}
