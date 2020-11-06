function _sort(data, prop, flag) {
    return data.sort((a, b) => {
        return flag ? a[prop] - b[prop] : b[prop] - a[prop]
    })
}
export const sortWithCondition = function(data, prop, flag) {
    const _data = JSON.parse(JSON.stringify(data));
    if (flag === 'descending') {
        return _sort(_data, prop, false);
    } else if (flag === 'ascending') {
        return _sort(_data, prop, true);
    }
}

