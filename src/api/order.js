import request from '@/utils/request'

// 获取用户收件地址信息
export const getAddressList = params => request({
  method: 'GET',
  url: '/address/list',
  params
})

// 获取确认订单需要的相关数据
export const confirmOrder = data => request({
  method: 'POST',
  url: '/order/confirm',
  data
})

// 创建订单
export const createOrder = (orderKey, data) => request({
  method: 'POST',
  url: `/order/create/${orderKey}`,
  data
})
