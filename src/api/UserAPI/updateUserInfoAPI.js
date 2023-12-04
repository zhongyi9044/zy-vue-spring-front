import httpInterface from '@/utils/http'

export const updateUserInfoAPI = (data) => {
  return httpInterface({
    url: '/user/update',
    method:'PUT',
    data
  })
}