import request from '@/utils/request'

// 商品列表请求
export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})