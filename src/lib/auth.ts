import { BaseUser } from '@/types/utils.types'

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('accessToken')
}

export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refreshToken')
}

export const setProfileToLS = (profile: BaseUser) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const clearAuthFromLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('profile')
}
