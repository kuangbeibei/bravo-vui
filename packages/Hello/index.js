import Hello from "./src/main.vue";

Hello.install = function (Vue) {
    Vue.component(Hello.name, Hello)
}

export default Hello;