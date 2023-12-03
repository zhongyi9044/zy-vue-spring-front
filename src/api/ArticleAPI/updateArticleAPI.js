import httpInterface from "@/utils/http";

export const updateArticleAPI = (data) => {
  return httpInterface({
    url: '/article',
    method:'PUT',
    data: data
  })
}