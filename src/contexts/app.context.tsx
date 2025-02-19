import React from 'react'

import { getAccessTokenFromLS, getProfileFromLS } from '@/lib/auth'
import { BaseUser } from '@/types/utils.types'

type AppContext = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: BaseUser | null
  setProfile: React.Dispatch<React.SetStateAction<BaseUser | null>>
}

const defaultContext: AppContext = {
  isAuthenticated: !!getAccessTokenFromLS(),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = React.createContext<AppContext>(defaultContext)

export default function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(defaultContext.isAuthenticated)
  const [profile, setProfile] = React.useState<BaseUser | null>(defaultContext.profile)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
