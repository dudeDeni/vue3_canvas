import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import './assets/style/tailwind.css'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .mount('#app')
