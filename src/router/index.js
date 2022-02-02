import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则配置
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/index.vue')
  },
  {
    path: '/category-detail/:categoryId',
    name: 'category-detail',
    component: () => import('@/views/CategoryDetail/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirm/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/order-detail/:orderId',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/Product/index.vue'),
    props: true
  },
  {
    path: '/comment/:productId',
    name: 'comment',
    component: () => import('@/views/Comment/index.vue'),
    props: true
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound/index.vue')
  }
]

// 创建 router 实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

import store from '@/store'

// 导航守卫
router.beforeEach(to => {
  // 对无需登陆的页面进行放行
  if (!to.meta.requireAuth) {
    return true
  }

  // 校验登陆状态
  if (!store.state.user.token || !window.localStorage.getItem('USER_TOKEN')) {
    // 跳转登陆页面
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
