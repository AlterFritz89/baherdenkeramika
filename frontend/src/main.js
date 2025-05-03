import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'

import tm from './locales/tm.json'
import ru from './locales/ru.json'

const messages = { ru, tm };
const savedLocale = localStorage.getItem('locale') || 'tm';

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'tm',
  messages
});

const app = createApp(App);
app.use(i18n);
app.use(router)
app.mount('#app');


