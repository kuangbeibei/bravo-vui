import Vue from "vue";
import Watcher from "./watcher";

Watcher.prototype.mutations = {
    setData(states, data) {
        states.data = data;
    },
    insertColumn(states, column) {
        states.columns.push(column)
    },
    updateColumns(states, columns) {
        states.columns = columns;
    },
    setExpandedRows(states) {
        states.expandedRows = Array(states.data.length).fill(false);
    },
    updateExpandedRows(states, expandedRows) {
        states.expandedRows = expandedRows;
    },
    setSortItems(states) {
        states.sortItems = Array(states.columns.length).fill({
            arrowUp: false,
            arrowDown: false
        })
    },
    updateSortItems(states, items) {
        states.sortItems = items;
    }
};

Watcher.prototype.commit = function (name, ...args) {
    const mutations = this.mutations;
    if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args));
    } else {
        throw new Error(`Action not found: ${ name }`);
    }
};

export default Watcher;
