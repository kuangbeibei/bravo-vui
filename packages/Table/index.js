import BravoTable from './src/main.vue';

/* istanbul ignore next */
BravoTable.install = function(Vue) {
  Vue.component(BravoTable.name, ElTable);
};

export default BravoTable;
