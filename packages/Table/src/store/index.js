import Vue from "vue";
import Watcher from "./watcher";

Watcher.prototype.mutations = {
    setData(states, data) {
        states.data = data;
    },
    updateData(states, data) { // 语义上和上面不一样，上面在被使用的context中是通过父传子属性改变的。这里是组件内部改变。
        states.data = data
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