import React from 'react'

import RegisterForm from '@/components/register-form'

export default function RegisterPage() {
  return (
    <React.Fragment>
      <div className='text-center mb-5'>
        <h2 className='text-xl font-semibold'>Đăng ký tài khoản</h2>
        <p className='text-sm text-muted-foreground'>Chào mừng đến với chúng tôi.</p>
      </div>
      <RegisterForm />
    </React.Fragment>
  )
}
