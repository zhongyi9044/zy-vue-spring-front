import httpInterface from "@/utils/http";

export const addArticleAPI = (data) => {
  return httpInterface({
    url: '/article',
    method: 'POST',
    data: data
  })
}