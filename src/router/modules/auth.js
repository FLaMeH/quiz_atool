import AuthLayout from '@/layouts/Auth/index'

export default {
  path: '/auth',
  component: AuthLayout,
  redirect: {
    name: 'login',
  },
  children: [
    {
      path: 'login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component:() => import('@/pages/auth/login'),
    },
  ],
}
