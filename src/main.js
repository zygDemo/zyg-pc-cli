import "./assets/main.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "amfe-flexible";
import store from "./stores";

import App from "./App.vue";
import router from "./router";
import { preventReClick } from "./utils/directive";

const app = createApp(App);

app.directive("preventReClick", preventReClick); //防抖

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(store);
app.use(router);

app.mount("#app");
