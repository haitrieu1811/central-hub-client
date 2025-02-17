import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-muted min-h-screen'>
      <div className='p-4'>
        <div className='bg-background rounded-lg shadow-xl p-4'>{children}</div>
      </div>
    </div>
  )
}
