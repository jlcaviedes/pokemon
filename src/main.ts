import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n/index.ts";
import "./style.css";
import router from "./ui/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
