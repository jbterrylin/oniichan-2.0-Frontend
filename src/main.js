import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/custom.scss';

// import 'jquery/src/jquery.js';
import 'popper.js/dist/popper.min.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

loadFonts();
const pinia = createPinia();

library.add(faEye)
library.add(faEyeSlash)

import Default from './layouts/Default.vue'
import WithNav from './layouts/WithNav.vue'

axios.defaults.baseURL = "http://127.0.0.1:3001"

createApp(App).use(pinia).use(router).use(VueAxios, axios)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component('default-layout', Default)
    .component('with-nav-layout', WithNav)
    .mount("#app");
