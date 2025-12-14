import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

axios.defaults.baseURL = "http://192.168.10.50:3001"
createApp(App).use(router).mount('#app');

