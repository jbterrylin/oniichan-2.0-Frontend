import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from 'axios';
import VueAxios from 'vue-axios';

loadFonts();
const pinia = createPinia();

axios.defaults.baseURL = "http://127.0.0.1:3001"

createApp(App).use(pinia).use(router).use(vuetify).use(VueAxios, axios).mount("#app");
