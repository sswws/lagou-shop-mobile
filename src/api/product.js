import request from '@/utils/request'

// 商品列表请求
export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})

// 获取某个指定商品详情
export const getProductDetails = productId => request({
  method: 'GET',
  url: `/product/detail/${productId}`
})

// 商品评价数量接口
export const getCommentCount = productId => request({
  method: 'GET',
  url: `/reply/config/${productId}`
})

// 请求不同类型的评论和数据
export const getCommentByTag = (productId, params) => request({
  method: 'GET',
  url: `/reply/list/${productId}`,
  params
})
