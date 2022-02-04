import request from '@/utils/request'

// 获取省市区列表
export const getCityList = () => request({
  method: 'GET',
  url: '/city_list'
})

// 新增（或编辑）地址
export const addAddress = data => request({
  method: 'POST',
  url: '/address/edit',
  data
})
