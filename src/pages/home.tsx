import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      HomePage
      <Link to={'/register'}>Đăng ký</Link>
    </div>
  )
}
