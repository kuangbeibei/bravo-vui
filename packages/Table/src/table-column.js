let columnIdSeed = 1;

export default {
    name: 'BravoTableColumn',
    props: {
        prop: String,
        label: String,
        type: {
            type: String,
            default: 'default',
        },
        width: String,
        formatter: Function
    },
    computed: {
        owner() {
            let parent = this.$parent;
            while(parent && !parent.tableId) {
                parent = parent.$parent;
            };
            return parent;
        }
    },
    render(h){
        return h('div', this.$slots.default);
    },
    data(){
        return {
            columnConfig: null
        }
    },
    created() {
        // 在这个阶段处理好数据，mounted阶段发送数据
        let column = {
            label: this.label,
            type: this.type,
            prop: this.prop,
            width: this.width,
            minWidth: 80
        };
        column.renderCell = (h, { item, column, $index }) => {
            if (column && column.formatter) {
                return column.formatter(item, column, item[column.prop], $index);
            } else {
                return item[column.prop]
            }
        }
        this.columnConfig = column;
    },
    mounted() {
        const owner = this.owner;
        this.columnConfig.columnId = owner.tableId + '_column_' + columnIdSeed++;
        owner.store.commit('insertColumn', this.columnConfig);
    },
}