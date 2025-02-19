import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import AuthLayout from '@/layouts/auth-layout'
import MainLayout from '@/layouts/main-layout'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'

function App() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default App
