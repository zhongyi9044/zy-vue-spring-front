import httpInterface from "@/utils/http";

export const updateCategoryAPI = (data) => {
  return httpInterface({
    url: '/category',
    method: 'PUT',
    data: {
      id: data.id,
      categoryName: data.newCategoryName,
      categoryAlias: data.newCategoryAlias,
    }
  })
}