import { Link } from 'react-router-dom'

import RegisterForm from '@/components/register-form'

export default function RegisterPage() {
  return (
    <div>
      <Link to={'/'}>Trang chủ</Link>
      <RegisterForm />
    </div>
  )
}
