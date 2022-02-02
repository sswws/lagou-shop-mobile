import request from '@/utils/request'

// 获取用户收件地址信息
export const getAddressList = params => request({
  method: 'GET',
  url: '/address/list',
  params
})
