import httpInterface from "@/utils/http";

export const getArticleDetailAPI = (id) => {
  return httpInterface({
    url: '/article/detail',
    params: {
      id
    }
  })
}