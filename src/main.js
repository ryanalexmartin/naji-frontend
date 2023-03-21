import { createApp } from 'vue'
import App from './App.vue'
import { createMetaManager } from 'vue-meta'

const app = createApp(App).use(createMetaManager());
app.mount('#app');