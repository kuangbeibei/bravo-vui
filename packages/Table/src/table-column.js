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
        sortable: {
            type: Boolean,
            default: false
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
            expandedInit: false,
            sortInit: false
        }
    },
    created() {
        // 在这个阶段处理好数据，mounted阶段发送数据
        let column = {
            label: this.label,
            type: this.type,
            prop: this.prop,
            width: this.sortable ? Number(this.width) + 20 :this.width,
            formatter: this.formatter,
            sortable: this.sortable,
            sorts: {
                arrowUp: false,
                arrowDown: false
            }
        };
        column.renderSortHeaderCell = (h, {column, idx}) => {
            if (!this.sortInit) {
                this.sortInit = true;
                this.owner.store.commit('setSortItems')
            }
            const callback = e => {
                const target = e.target;
                const classList = Array.from(target.classList);
                if (classList.includes('sort-caret')) {
                    const flag = classList.includes('descending') ? 'descending' : 'ascending';
                    this.owner.store.toggleSortArrow(idx, flag)
                }
            }
            return <div class="cell" style={{ width: column.width + 'px' }}>
                {column.label}
                <span class="caret-wrapper" on-click={(e) => callback(e)}>
                    <i class={["sort-caret ascending", {"active": this.owner.sortItems && this.owner.sortItems[idx] && this.owner.sortItems[idx].arrowUp}]} ></i>
                    <i class={["sort-caret descending", {"active": this.owner.sortItems && this.owner.sortItems[idx] && this.owner.sortItems[idx].arrowDown}]}></i>
                </span>
            </div>
        }
        column.renderBodyCell = (h, { item, column, $index }) => { // 一定要有h才能return jsx语法
            if (column.type && column.type === 'expand') {
                if (!this.expandedInit) {
                    this.expandedInit = true;
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
                    <i></i>
                    <i class="arrow-expand" on-click={callback}> {this.owner.expandedRows && this.owner.expandedRows[$index] ? this.renderArrowDown() : this.renderArrowRight()} </i>
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
    methods: {
        renderArrowRight() {
            return <svg t="1603261526443" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2829" width="16" height="16"><path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z" p-id="2830" fill="#515151"></path></svg>
        },
        renderArrowDown() {
            return <svg t="1603261598215" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010" width="16" height="16"><path d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z" p-id="3011" fill="#515151"></path></svg>
        }
    }
}