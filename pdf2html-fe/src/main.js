import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import { Button, Upload, Progress } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Button);
Vue.use(Upload);
Vue.use(Progress);

new Vue({
    render: h => h(App),
}).$mount("#app");
