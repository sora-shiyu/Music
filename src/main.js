import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(ElementUI).use(store).use(router).mount('#app')
