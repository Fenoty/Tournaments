import "@assets/styles/_base.scss";

import App from "@/App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

app.use(Vue3Toasity, {
    autoClose: 3000,
} as ToastContainerOptions)

app.use(router);
app.mount("#app");




