import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import '@primer/css/dist/primer.css'

createApp(App).use(store).mount('#app')
