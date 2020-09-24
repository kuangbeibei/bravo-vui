import Store from "./index";
export function createStore(table, initialState = {}) {
    const store = new Store();
    store.table = table;
    Object.keys(initialState).forEach(key => {
        store.table[key] = initialState[key];
    })
    return store
};

export function mapStates(mapper) {
    let res = {};
    Object.keys(mapper).forEach(key => {
        const value = mapper[key];
        let fn;
        if (typeof value === 'string') {
            fn = function() {
                return this.store.states[value];
            }
        } else {
            console.error('invalid value type');
        }
        if (fn) {
            res[key] = fn;
        }
    });
    return res;
}
