import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/plugins/vee-validate/rules.js'
import App from './App.vue'
import router from './router'

import I18n from '@/i18n/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(I18n)

app.mount('#app')
