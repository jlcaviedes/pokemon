import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./ui/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
