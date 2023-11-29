import { createApp } from 'vue'
import { createPinia } from 'pinia'
//pinia的可持久化插件
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/main.scss'
import App from './App.vue'
// import router from './router'

const app = createApp(App)
const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// app.use(router)
app.mount('#app')

