import http from '@/lib/http'
import { LoginReqBody, RegisterReqBody } from '@/types/users.types'
import { AuthRes } from '@/types/utils.types'

export const LOGIN_API_ENDPOINT = '/users/login'
export const REGISTER_API_ENDPOINT = '/users/register'

const usersApis = {
  register(body: RegisterReqBody) {
    return http.post<AuthRes>(REGISTER_API_ENDPOINT, body)
  },

  login(body: LoginReqBody) {
    return http.post<AuthRes>(LOGIN_API_ENDPOINT, body)
  }
} as const

export default usersApis
