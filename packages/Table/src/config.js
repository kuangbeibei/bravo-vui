export const cellForced = {
    selection: {

    },
    expand: {
        renderHeader: function (h, { column }) {
            return column.label || '';
        },
        renderCell: function (h, { row, store }) {
            const classes = ['el-table__expand-icon'];
            if (store.states.expandRows.indexOf(row) > -1) {
                classes.push('el-table__expand-icon--expanded');
            }
            const callback = function (e) {
                e.stopPropagation();
                store.toggleRowExpansion(row);
            };
            return (<div class={classes}
                on-click={callback}>
                <i class='el-icon el-icon-arrow-right'></i>
            </div>);
        },
        sortable: false,
        resizable: false,
        className: 'el-table__expand-column'
    }
};