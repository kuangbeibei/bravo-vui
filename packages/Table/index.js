import KkTable from './src/table';

/* istanbul ignore next */
KkTable.install = function(Vue) {
  Vue.component(KkTable.name, ElTable);
};

export default KkTable;
