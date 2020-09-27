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
        states.columns = columns
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
