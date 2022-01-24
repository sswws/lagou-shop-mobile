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
    props: true
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirm/index.vue'),
    props: true
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue')
  },
  {
    path: '/order-detail/:orderId',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail/index.vue'),
    props: true
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue')
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/Product/index.vue'),
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
    component: () => import('@/views/Cart/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue')
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

export default router
