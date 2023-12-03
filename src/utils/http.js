import axios from "axios";
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/useTokenStore.js'
import router from '@/router'
const baseURL = '/api';//解决跨域问题，详情操作在vite.config

const httpInterface = axios.create({
  baseURL: baseURL,
  timeout: 1000,
})

// 添加请求拦截器
httpInterface.interceptors.request.use(function (config) {
  //在发送请求之前做什么
  let tokenStore = useTokenStore()
  //如果token中有值，在携带
  if (tokenStore.token) {
    config.headers.Authorization = tokenStore.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpInterface.interceptors.response.use(function (response) {
  if (response.data.code === 0) {
    return response.data
  } else {
    ElMessage.error(response.data.message ? response.data.message : '操作异常')
    return Promise.reject(response.data)
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  //如果响应状态码时401，代表未登录，给出对应的提示，并跳转到登录页
  if (error.response.status === 401) {
    ElMessage.error('请先登录！')
    router.push('/login')
  } else {
    ElMessage.error('服务异常');
  }
  return Promise.reject(error);
});

export default httpInterface