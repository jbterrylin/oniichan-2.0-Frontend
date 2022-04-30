import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import axios from 'axios';
import VueAxios from 'vue-axios';

import vuetify from './plugins/vuetify';

loadFonts();
const pinia = createPinia();

import Default from './layouts/Default.vue'
import WithNav from './layouts/WithNav.vue'

axios.defaults.baseURL = "http://127.0.0.1:3001"

createApp(App).use(pinia).use(router).use(VueAxios, axios).use(vuetify)
    .component('default-layout', Default)
    .component('with-nav-layout', WithNav)
    .mount("#app");
