import index from '@/router/modules'
import auth from "@/router/modules/auth";

const baseRoute = [
  index,
  auth,
]

const errorPage = [
  {
    path: '/*',
    name: '404',
    meta: {
      title: '404',
    },
    component:()=>import('@/pages/system/error/404'),
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403',
    },
    component:() => import('@/pages/system/error/403'),
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '500',
    },
    component:()=>import('@/pages/system/error/500'),
  },
]

export default [
  ...baseRoute,
  ...errorPage,
]
