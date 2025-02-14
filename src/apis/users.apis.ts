import http from '@/lib/http'
import { RegisterReqBody, RegisterSuccessRes } from '@/types/users.types'

const usersApis = {
  register(body: RegisterReqBody) {
    return http.post<RegisterSuccessRes>('/users/register', body)
  }
} as const

export default usersApis
