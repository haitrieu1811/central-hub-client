import { UserRole } from '@/constants/enum'
import { AuthRes, SuccessRes } from '@/types/utils.types'

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

export type RegisterSuccessRes = SuccessRes<
  AuthRes & {
    user: {
      _id: string
      email: string
      fullName: string
      createdAt: string
      updatedAt: string
    }
  }
>

export type LoginSuccessRes = RegisterSuccessRes
