import "@assets/styles/_base.scss";

import App from "@/App.vue";
import { Skeletor } from 'vue-skeletor';
import VueAxios from "vue-axios";
import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

app.component(Skeletor.name, Skeletor);
app.use(router);
app.mount("#app");




