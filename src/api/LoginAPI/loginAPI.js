import httpInterface from '@/utils/http'

export const loginAPI = (data) => {
  return httpInterface({
    url: 'user/login',
    method: 'POST',
    params: {
      username: data.username,
      password: data.password
    }
  })
}