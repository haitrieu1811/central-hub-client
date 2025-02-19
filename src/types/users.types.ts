import { UserRole } from '@/constants/enum'

export type RegisterReqBody = {
  email: string
  password: string
  confirmPassword: string
  role: UserRole
}

export type LoginReqBody = {
  email: string
  password: string
}
