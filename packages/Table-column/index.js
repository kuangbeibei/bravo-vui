import BravoTableColumn from '../Table/src/table-column';

/* istanbul ignore next */
BravoTableColumn.install = function(Vue) {
  Vue.component(BravoTableColumn.name, ElTableColumn);
};

export default BravoTableColumn;
