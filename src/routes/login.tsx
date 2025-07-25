import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { isLoggedIn } from 'axios-jwt'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AUTH_REDIRECTS } from '@/constants/auth'
import { useAuth } from '@/providers/auth'

const LoginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

type LoginFormValues = z.infer<typeof LoginSchema>

const Login = () => {
  const { loginMutation } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values)
  }

  return (
    <>
      <title>Login</title>
      <div className='mx-auto mt-10 max-w-sm'>
        <h1 className='mb-6 text-2xl font-bold'>Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='you@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
              type='submit'
              className='w-full'
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export const Route = createFileRoute('/login')({
  component: Login,
  loader: async () => {
    const isAuth = await isLoggedIn()
    if (isAuth) {
      throw redirect({ to: AUTH_REDIRECTS.LOGIN, replace: true })
    }
  }
})
