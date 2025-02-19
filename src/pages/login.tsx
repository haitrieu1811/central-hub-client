import React from 'react'

import LoginForm from '@/components/login-form'

export default function LoginPage() {
  return (
    <React.Fragment>
      <div className='text-center mb-5'>
        <h2 className='text-xl font-semibold'>Đăng nhập</h2>
        <p className='text-sm text-muted-foreground'>Chào mừng quay trở lại.</p>
      </div>
      <LoginForm />
    </React.Fragment>
  )
}
