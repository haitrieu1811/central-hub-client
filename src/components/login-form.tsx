import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import React from 'react'

import usersApis from '@/apis/users.apis'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PATH from '@/constants/path'
import { isUnprocessableEntityAxiosError } from '@/lib/utils'
import { loginSchema, LoginSchema } from '@/rules/users.rules'
import { SuccessRes } from '@/types/utils.types'
import { AppContext } from '@/contexts/app.context'

export default function LoginForm() {
  const navigate = useNavigate()

  const { setIsAuthenticated, setProfile } = React.useContext(AppContext)

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: usersApis.login,
    onSuccess: (data) => {
      toast.success(data.data.message)
      navigate(PATH.HOME)
      setIsAuthenticated(true)
      setProfile(data.data.data.user)
    },
    onError: (error) => {
      if (isUnprocessableEntityAxiosError<SuccessRes<LoginSchema>>(error)) {
        const errors = error.response?.data.data
        if (!errors) return
        Object.keys(errors).forEach((key) => {
          form.setError(key as keyof LoginSchema, {
            message: errors[key as keyof LoginSchema],
            type: 'Server'
          })
        })
      }
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data)
  })

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={handleSubmit}>
        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='block'>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Mật khẩu */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='block'>Mật khẩu</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          {loginMutation.isPending && <Loader2 size={16} className='animate-spin mr-2' />}
          Đăng nhập
        </Button>
        <div className='flex items-center justify-center'>
          <p className='text-sm text-muted-foreground'>Bạn chưa có tài khoản?</p>
          <Button asChild variant='link' className='px-1'>
            <Link to={PATH.REGISTER}>Đăng ký</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
