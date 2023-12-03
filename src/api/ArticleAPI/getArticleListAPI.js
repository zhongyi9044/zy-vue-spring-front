import httpInterface from "@/utils/http";

export const getArticleListAPI = (data) => {
  return httpInterface({
    url: '/article',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      categoryId: data.categoryId,
      state: data.state
    }
  })
}