import httpInterface from '@/utils/http'

export const registerAPI = (data) => {
  return httpInterface({
    url: 'user/register',
    method: 'POST',
    params: {
      username: data.username,
      password: data.password
    }
  })
}