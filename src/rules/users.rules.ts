import z from 'zod'

const userSchema = z.object({
  email: z.string().email('Email không hợp lệ.'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có độ dài từ 8 đến 32 ký tự.')
    .max(32, 'Mật khẩu phải có độ dài từ 8 đến 32 ký tự.'),
  confirmPassword: z.string()
})

export const registerSchema = userSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Nhập lại mật khẩu không chính xác.',
    path: ['confirmPassword']
  })

export type RegisterSchema = z.infer<typeof registerSchema>
