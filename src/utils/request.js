import axios from 'axios'

const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})

// 引入 store
import store from '@/store'

// 在请求拦截器中进行 token 设置
request.interceptors.request.use(config => {
  // 获取 Token
  const { user } = store.state
  if (user) {
    // 设置请求头
    config.headers.Authorization = 'Bearer ' + user
  }
  return config
})

// 引入 router
import router from '@/router'

// 在响应拦截器中进行设置
request.interceptors.response.use(config => {
  // 根据我们的后端响应数据，发现响应的状态信息为 410000 时，说明用户未登录访问了相关接口
  // 跳转登陆页
  if (config.data.status === 410000) {
    router.push({
      name: 'login',
      params: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return config
})

export default request
