import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
  //1.定义描述token
  const myUserInfo = ref({})

  //2.定义修改token的方法
  const setUserInfo = (userInfo) => {
    myUserInfo.value = userInfo
  }

  //3.定义移除token的方法
  const removeUserInfo = () => {
    myUserInfo.value = ''
  }
  return {
    myUserInfo,setUserInfo,removeUserInfo
  }
},
{
  persist: true
})