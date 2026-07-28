import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { setRouter } from './services/api'
import './assets/style.css'
import App from './App.vue'

setRouter(router)

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
