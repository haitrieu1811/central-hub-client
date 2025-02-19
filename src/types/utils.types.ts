export type SuccessRes<Data> = {
  message: string
  data: Data
}

export type OnlyMessageRes = {
  message: string
}

export type BaseUser = {
  _id: string
  email: string
  fullName: string
  createdAt: string
  updatedAt: string
}

export type AuthRes = SuccessRes<{
  accessToken: string
  refreshToken: string
  user: BaseUser
}>
