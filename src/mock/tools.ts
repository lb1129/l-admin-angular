export const response = <T>(data: T, message?: string, status?: number) => ({
  status: status ?? 200,
  data: {
    data,
    message: message ?? 'ok'
  }
})
