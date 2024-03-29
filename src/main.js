import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import VueAxios from "vue-axios";

import vuetify from "./plugins/vuetify";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "../src/styles/_variables.scss";
import 'ant-design-vue/dist/antd.less';

// v-select's item text and title not work in this version, fuck

loadFonts();
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import Default from "./layouts/Default.vue";
import WithNav from "./layouts/WithNav.vue";

axios.defaults.baseURL = "http://127.0.0.1:3001";

const app = createApp(App)
    .component("default-layout", Default)
    .component("with-nav-layout", WithNav)
    .use(pinia)
    .use(router)
    .use(VueAxios, axios)
    .use(vuetify)
    .use(Antd)
    .mount("#app");

app.$http = axios.create();
