import request from '@/utils/request'

// 加入购物车
export const addToCart = data => request({
  method: 'POST',
  url: '/cart/add',
  data
})