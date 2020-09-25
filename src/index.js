import Vue from "vue";
import App from "./index.vue";
import BravoVui from "../package/bravovui";

Vue.use(BravoVui);

new Vue({
    render: h => h(App)
}).$mount('#app');