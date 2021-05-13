import { createApp } from 'vue';
import App from './App.vue';
import route from './routes/index';

const app = createApp(App);
app.use(route);
app.mount('#app');
