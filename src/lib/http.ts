import axios, { AxiosInstance } from 'axios'

import { LOGIN_API_ENDPOINT, REGISTER_API_ENDPOINT } from '@/apis/users.apis'
import {
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '@/lib/auth'
import { AuthRes, BaseUser } from '@/types/utils.types'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private profile: BaseUser | null
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS() || ''
    this.refreshToken = getRefreshTokenFromLS() || ''
    this.profile = getProfileFromLS()
    this.refreshTokenRequest = null

    this.instance = axios.create({
      baseURL: 'http://localhost:4000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        return config
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { url } = response.config
        if (url && [REGISTER_API_ENDPOINT, LOGIN_API_ENDPOINT].includes(url)) {
          const accessToken = (response.data as AuthRes).data.accessToken
          const refreshToken = (response.data as AuthRes).data.refreshToken
          const profile = (response.data as AuthRes).data.user
          this.accessToken = accessToken
          this.refreshToken = refreshToken
          this.profile = profile
          setAccessTokenToLS(accessToken)
          setRefreshTokenToLS(refreshToken)
          setProfileToLS(profile)
        }
        return response
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
