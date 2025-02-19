import http from '@/lib/http'
import { LoginReqBody, LoginSuccessRes, RegisterReqBody, RegisterSuccessRes } from '@/types/users.types'

const usersApis = {
  register(body: RegisterReqBody) {
    return http.post<RegisterSuccessRes>('/users/register', body)
  },

  login(body: LoginReqBody) {
    return http.post<LoginSuccessRes>('/users/login', body)
  }
} as const

export default usersApis
