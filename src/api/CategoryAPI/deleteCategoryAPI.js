import httpInterface from "@/utils/http";

export const deleteCategoryAPI = (id) => {
  return httpInterface({
    url: '/category',
    method: 'DELETE',
    params: {
      id
    }
  })
}