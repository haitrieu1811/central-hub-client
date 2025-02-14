import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserRole } from '@/constants/enum'
import { isUnprocessableEntityAxiosError } from '@/lib/utils'
import { RegisterSchema, registerSchema } from '@/rules/users.rules'
import { SuccessRes } from '@/types/utils.types'

export default function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: usersApis.register,
    onSuccess: (data) => {
      toast.success(data.data.message)
      form.reset()
    },
    onError(error) {
      if (isUnprocessableEntityAxiosError<SuccessRes<RegisterSchema>>(error)) {
        const errors = error.response?.data.data
        if (!errors) return
        Object.keys(errors).forEach((key) => {
          form.setError(key as keyof RegisterSchema, {
            message: errors[key as keyof RegisterSchema],
            type: 'Server'
          })
        })
      }
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    registerMutation.mutate({
      ...data,
      role: UserRole.Customer
    })
  })

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={handleSubmit}>
        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Sau khi đăng ký thành công sẽ có thư gửi về email quý khách vừa nhập để xác minh email. Vui lòng xác
                minh email để sử dụng.
              </FormDescription>
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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Nhập lại mật khẩu */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          {registerMutation.isPending && <Loader2 size={16} className='animate-spin mr-2' />}
          Đăng ký
        </Button>
      </form>
    </Form>
  )
}
