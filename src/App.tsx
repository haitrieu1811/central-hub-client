import { Route, Routes } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import AuthLayout from '@/layouts/auth-layout'
import MainLayout from '@/layouts/main-layout'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path='/register'
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />
        <Route
          path='/login'
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
      </Routes>
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default App
