export type SuccessRes<Data> = {
  message: string
  data: Data
}

export type AuthRes = {
  accessToken: string
  refreshToken: string
}
