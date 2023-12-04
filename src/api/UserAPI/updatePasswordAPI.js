import httpInterface from '@/utils/http'

export const updatePasswordAPI = (data) => {
  return httpInterface({
    url: '/user/updatePwd',
    method: 'PATCH',
    data
  })
}