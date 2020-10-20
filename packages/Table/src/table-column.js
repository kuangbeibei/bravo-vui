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
        formatter: {
            type: Function | undefined,
            default: undefined
        },
    },
    computed: {
        owner() {
            let parent = this.$parent;
            while(parent && !parent.tableId) {
                parent = parent.$parent;
            };
            return parent;
        },
    },
    render(h){
        return h('div', this.$slots.default);
    },
    data(){
        return {
            columnConfig: null,
            init: false
        }
    },
    created() {
        // 在这个阶段处理好数据，mounted阶段发送数据
        let column = {
            label: this.label,
            type: this.type,
            prop: this.prop,
            width: this.width,
            formatter: this.formatter,
        };
        column.renderCell = (h, { item, column, $index }) => { // 一定要有h才能return jsx语法
            if (column.type && column.type === 'expand') {
                if (!this.init) {
                    this.init = true;
                    this.owner.store.commit('setExpandedRows');
                }
                // let children;
                const callback = (e) => {
                    this.owner.store.toggleRowExpansion($index);

                    // if (this.owner.expandedRows[$index] && this.$scopedSlots.default) {
                    //     children = this.$scopedSlots.default(item); // 在这赋值不起作用
                    // } else {
                    //     console.log('我隐藏啦')
                    //     children = null;
                    // }
                }
                this.owner.renderExpanded = (h, item) => {
                    if (this.owner.expandedRows && this.owner.expandedRows[$index]) {
                        return this.$scopedSlots.default
                        ? this.$scopedSlots.default(item)
                        : this.$slots.default;
                    }
                };
                return (<div>
                    <i class="arrow-right" on-click={callback}> {this.owner.expandedRows && this.owner.expandedRows[$index] ? '收起' : '展开'} </i>
                    {/* {this.owner.expandedRows && this.owner.expandedRows[$index] && this.$scopedSlots.default(item) } */}
                </div>);
            }
            if (column && column.formatter) {
                return column.formatter(item, column, item[column.prop], $index);
            } else {
                return item[column.prop]
            }
        }
        this.columnConfig = column;
    },
    mounted() {
        this.columnConfig.columnId = this.owner.tableId + '_column_' + columnIdSeed++;
        this.owner.store.commit('insertColumn', this.columnConfig);
    },
}