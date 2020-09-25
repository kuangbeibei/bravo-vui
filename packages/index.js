import BravoTable from "./Table";
import BravoTableColumn from "./Table-column"

const components = [
    BravoTable,
    BravoTableColumn
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
    BravoTable,
    BravoTableColumn
}