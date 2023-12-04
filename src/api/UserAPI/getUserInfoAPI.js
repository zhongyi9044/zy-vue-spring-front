import httpInterface from '@/utils/http'

export const getUserInfoAPI = () => {
  return httpInterface({
    url: '/user/userInfo',
  })
}