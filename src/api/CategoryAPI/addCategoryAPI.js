import httpInterface from "@/utils/http";

export const addCategoryAPI = (data) => {
  return httpInterface({
    url: '/category',
    method: 'POST',
    data: {
      categoryName: data.newCategoryName,
      categoryAlias: data.newCategoryAlias
    }
  })
}