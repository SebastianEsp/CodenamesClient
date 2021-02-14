import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

import './styles/tailwind.css'

const emitter = mitt()
let app = createApp(App)

app.config.globalProperties.emitter = emitter
app.use(router).mount('#app')
