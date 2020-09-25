import BravoTable from './src/table/main.vue';

/* istanbul ignore next */
BravoTable.install = function(Vue) {
  Vue.component(BravoTable.name, ElTable);
};

export default BravoTable;
