export interface IResponse<T> {
  data: T
  errCode: number
  errMsg: string
}
