import Vue from "vue";
import App from "./App.vue";
import global from "./config";

Vue.config.productionTip = false;

import { Button, Upload, Progress } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Button);
Vue.use(Upload);
Vue.use(Progress);
// 全局变量
Vue.prototype.GLOBAL = global;

new Vue({
    render: h => h(App),
}).$mount("#app");
