import BasicLayout from '@/layouts/Public'

const pre = 'home_'

export default {
  path: '/',
  name: 'home',
  header: 'home',
  redirect: {
    name: `${pre}index`,
  },
  meta: {
    auth: true,
    title: '首页',
  },
  component: BasicLayout,
  children: [
    {
      path: 'dashboard',
      name: `${pre}index`,
      component:() => import('@/pages/home/dashboard'),
    },
  ],
}
