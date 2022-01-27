import request from '@/utils/request'

// 请求首页默认数据
export const getDefaultData = () => request({
  method: 'GET',
  url: '/v2/diy/get_diy/moren'
})

// 请求 logo 图
export const getLogo = () => request({
  method: 'GET',
  url: '/wechat/get_logo'
})
