import { getRefreshTokenFromLS } from '@/lib/auth'
import http from '@/lib/http'
import { LoginReqBody, RegisterReqBody } from '@/types/users.types'
import { AuthRes, OnlyMessageRes } from '@/types/utils.types'

export const LOGIN_API_ENDPOINT = '/users/login'
export const REGISTER_API_ENDPOINT = '/users/register'
export const LOGOUT_API_ENDPOINT = '/users/logout'

const usersApis = {
  register(body: RegisterReqBody) {
    return http.post<AuthRes>(REGISTER_API_ENDPOINT, body)
  },

  login(body: LoginReqBody) {
    return http.post<AuthRes>(LOGIN_API_ENDPOINT, body)
  },

  logout() {
    const refreshToken = getRefreshTokenFromLS() || ''
    return http.post<OnlyMessageRes>(LOGOUT_API_ENDPOINT, { refreshToken })
  }
} as const

export default usersApis
