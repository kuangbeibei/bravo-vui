import Level from "./src/main.vue";

Level.install = function (Vue) {
    Vue.component(Level.name, Hello)
}

export default Level;