import httpInterface from "@/utils/http";

export const deleteArticleAPI = (id) => {
  return httpInterface({
    url: '/article',
    method: 'DELETE',
    params: { id }
  })
}