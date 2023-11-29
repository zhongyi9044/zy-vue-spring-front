import axios from "axios";
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const baseURL = '/api';//解决跨域问题，详情操作在vite.config

const httpInterface = axios.create({
  baseURL: baseURL,
  timeout: 1000,
})

// 添加请求拦截器
httpInterface.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
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
  ElMessage.error('服务异常')
  return Promise.reject(error);
});

export default httpInterface