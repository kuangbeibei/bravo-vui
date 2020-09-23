import Hello from "./Hello";
import Level from "./Level"

const components = [
    Hello,
    Level
]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: '1.0.0',
    install,
    Hello,
    Level
}