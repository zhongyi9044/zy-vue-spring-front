import httpInterface from "@/utils/http";

export const getCategoryAPI = () => {
  return httpInterface({
    url: '/category',
  })
}