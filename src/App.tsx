import React from 'react'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import PATH from '@/constants/path'
import { AppContext } from '@/contexts/app.context'
import AuthLayout from '@/layouts/auth-layout'
import MainLayout from '@/layouts/main-layout'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'

const ProtectedRoute = () => {
  const { isAuthenticated } = React.useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = React.useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOME} />
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.HOME,
          element: (
            <MainLayout>
              <HomePage />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          )
        },
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          )
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
